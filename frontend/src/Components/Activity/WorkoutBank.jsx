import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import WorkoutModal from "../Activity/WorkoutModal";
import WorkoutFilter from "../Activity/WorkoutFilter";
import axios from "axios";

export default function WorkoutBank({ userId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    equipment: "",
    difficulty: "",
    goal: "",
    muscle: "",
  });

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
    axios
      .get(process.env.REACT_APP_HOST+"/Workouts")
      .then((response) => {
        if (response.data.ok) {
          setOriginalData(response.data.exercises);
          setFilteredData(response.data.exercises);
        } else {
          console.error("Error retrieving workouts");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const applyFilters = () => {
    const filtered = originalData.filter((workout) => {
      return (
        (appliedFilters.equipment === "" ||
          workout.equipment_list.includes(appliedFilters.equipment)) &&
        (appliedFilters.difficulty === "" ||
          workout.difficulty === appliedFilters.difficulty) &&
        (appliedFilters.goal === "" ||
          workout.goal.toLowerCase().trim() ===
            appliedFilters.goal.toLowerCase().trim()) &&
        (appliedFilters.muscle === "" ||
          workout.muscle_groups
            .toLowerCase()
            .trim()
            .includes(appliedFilters.muscle))
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="Workout-page">
      <div className="header">
        <h2>Add Workouts</h2>
      </div>
      <div className="filter">
        <WorkoutFilter
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          applyFilters={applyFilters}
        />
      </div>
      <div className="list">
        {filteredData.map((workout, index) => (
          <div
            className="Workout-details"
            key={`${workout.workout_name}-${index}`}
            onClick={() => openModal(workout)}
          >
            <h2>{workout.workout_name}</h2> <p>Goal: {workout.goal}</p>
            <p>Equipment: {workout.equipment_list}</p>
          </div>
        ))}
      </div>
        <WorkoutModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          selectedWorkout={selectedWorkout}
          userId={userId}
        />
    </div>
  );
}
