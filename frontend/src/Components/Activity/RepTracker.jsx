import React, { useState } from "react";

const RepTracker = () => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);

  const handleAddSet = () => {
    setSets([...sets, { reps: "", weight: "" }]);
  };

  const handleDeleteSet = (index) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  const handleInputChange = (index, key, value) => {
    if (/^\d+$/.test(value) || value === "") {
      const newSets = [...sets];
      newSets[index][key] = value;
      setSets(newSets);
    }
  };

  const handleExerciseChange = (value) => {
    setExercise(value);
  };

  const handleSave = () => {
    // Log the data
    console.log("Exercise: ", exercise);
    console.log("Sets: ", sets);

    // Clear the form
    setExercise("");
    setSets([{ reps: "", weight: "" }]);
  };

  return (
    <div>
      <h2 className="header">Today's Workout</h2>
      <div className="form-container">
        <div className="rep-form">
          <label>
            <div className="title">Exercise name:</div>
            <input
              className="exercise-input"
              type="text"
              value={exercise}
              onChange={(e) => handleExerciseChange(e.target.value)}
            />
          </label>
          {sets.map((set, index) => (
            <div key={index}>
              <label>
                Set {index + 1} - Reps:{" "}
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                />
              </label>
              <label className="weight-form">
                Weight:
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                />
              </label>
              {sets.length > 1 && (
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => handleDeleteSet(index)}
                >
                  Delete Set
                </button>
              )}
            </div>
          ))}
          <div>
            <button type="button" onClick={handleAddSet}>
              Add Set
            </button>
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepTracker;