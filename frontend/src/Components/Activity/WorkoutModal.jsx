import React, { useState } from "react";
import Modal from "react-modal";
import "../Workout/Styles/WorkoutModal.css";
import axios from "axios";

const WorkoutModal = ({ isOpen, closeModal, selectedWorkout, userId }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddWorkout = () => {
    axios
      .post(process.env.REACT_APP_HOST+"/workoutsadded", {
        userId,
        workoutId: selectedWorkout.workout_id,
      })
      .then((response) => {
        setSuccessMessage("Workout added to Your Workouts!");
        console.log(response.data);
      })
      .catch((error) => {
        setSuccessMessage("Workout Added Already!");
        console.error(error);
      });
  };

  const handleRemoveWorkout = () => {
    axios
      .delete(process.env.REACT_APP_HOST+"/workoutsremoved", {
        data: {
          userId,
          workoutId: selectedWorkout.workout_id,
        },
      })
      .then((response) => {
        setSuccessMessage("Workout removed!");
        console.log(response.data);
      })
      .catch((error) => {
        setSuccessMessage("Error removing workout. Please try again.");
        console.error(error);
      });
  };

  const handleModalClose = () => {
    setSuccessMessage(null);
    closeModal();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Workout Details"
      className="workout-modal"
      overlayClassName="workout-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal-header">
        <button className="close-button" onClick={handleModalClose}>
          X
        </button>
      </div>
      <div>
        <h1 className="workout-name">
          {selectedWorkout && selectedWorkout.workout_name}
        </h1>
        <p>
          <strong>Goal:</strong> {selectedWorkout && selectedWorkout.goal}
        </p>
        <p>
          <strong>Equipment:</strong>{" "}
          {selectedWorkout && selectedWorkout.equipment_list}
        </p>
        <p>
          <strong>Difficulty:</strong>{" "}
          {selectedWorkout && selectedWorkout.difficulty}
        </p>
        <p>
          <strong>Muscle Target Groups:</strong>{" "}
          {selectedWorkout && selectedWorkout.muscle_groups}
        </p>
        <p>
          <strong>Exercises:</strong>{" "}
          {selectedWorkout && selectedWorkout.exercises}
        </p>

        {selectedWorkout && selectedWorkout.link && (
          <p>
            Link:{" "}
            <a
              href={selectedWorkout.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedWorkout.link}
            </a>
          </p>
        )}
        <div className="weekdays">
          <button onClick={handleAddWorkout}>Add</button>
          <button onClick={handleRemoveWorkout}>Delete</button>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WorkoutModal;
