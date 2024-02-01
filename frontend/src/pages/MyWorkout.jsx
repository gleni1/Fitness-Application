import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import WorkoutModal from "../Components/Activity/WorkoutModal";
import axios from "axios";
import "./styles/MyWorkout.css";

export default function MyWorkout({ userId }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
    setModalIsOpen(false);
  };

const updateWorkouts = () => {
  axios.get(`${process.env.REACT_APP_HOST}/myworkouts/${userId}`)

    .then((response) => {
      if (response.data.ok) {
        setOriginalData(response.data.exercises); 
      } else {
        console.error("Error retrieving workouts");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      setLoading(false);
    });
};


  useEffect(() => {
    Modal.setAppElement("#root");
    if (userId) {
      updateWorkouts();
    }
  }, [userId]);

  return (
    <div className="myworkout-page">
      <div className="header">Your Workouts</div>
      <div className="myWorkoutform-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          originalData.map((workout, index) => (
            <div
              className="myWorkout-container"
              key={`${workout.workout_name}-${index}`}
              onClick={() => openModal(workout)}
            >
              <h2>{workout.workout_name}</h2> <p>Goal: {workout.goal}</p>
              <p>Equipment: {workout.equipment_list}</p>
            </div>
          ))
        )}
      </div>
      {userId && (
        <WorkoutModal
          isOpen={modalIsOpen}
          closeModal={() => {
            closeModal();
            updateWorkouts(); 
          }}
          selectedWorkout={selectedWorkout}
          userId={userId}
        />
      )}
    </div>
  );
}