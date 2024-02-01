import React from "react";
import Modal from "react-modal";
import "./Styles/WorkoutModal.css";

Modal.setAppElement("#root"); // Make sure to set the root element for accessibility

const ExerciseModal = ({ isOpen, closeModal, selectedWorkout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Workout Details"
      className="workout-modal center" // Add the "center" class
      overlayClassName="workout-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal-header">
        <button className="close-button" onClick={closeModal}>
          X
        </button>
      </div>
      {selectedWorkout ? (
        <div>
          <h2 className="workout-name">{selectedWorkout.exercise_name}</h2>
          <p>
            <strong>Equipment:</strong> {selectedWorkout.equipment_names}

          </p>
          <p>
            <strong>Muscle:</strong> {selectedWorkout.muscle}
          </p>

          {selectedWorkout.link && (
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={selectedWorkout.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedWorkout.link}
              </a>
            </p>
          )}

          <p>
            <strong>Instructions:</strong>
            <br /> {selectedWorkout.steps}
          </p>
        </div>
      ) : (
        <p>No workout selected</p>
      )}
    </Modal>
  );
};

export default ExerciseModal;
