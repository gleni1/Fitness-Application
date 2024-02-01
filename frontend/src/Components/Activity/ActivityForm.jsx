import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityForm({ userId }) {
  const [calorieIntake, setCalorieIntake] = useState("");
  const [weight, setWeight] = useState("");
  const [mood, setMood] = useState("");

  const [formSaved, setFormSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activities, setActivities] = useState([]);

  function getNumberedDate(date) {
    date = date || new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getNextDate(date) {
    date = date || new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getFormattedDate(date) {
    date = date || new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/activities/${userId}`)
      .then((response) => {
        if (response.data.ok) {
          setActivities(response.data.activities);
        } else {
          console.error("Error retrieving activities");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId, activities]);

  const handleSave = async () => {
    if (!isValidInput(calorieIntake) || !isValidInput(weight)) {
      setErrorMessage("Please enter valid numbers.");
      return;
    }
    if (mood === "") {
      setErrorMessage("Please select a mood.");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_HOST + "/activitySurvey",
        {
          userId,
          entryDate: getNextDate(),
          calorieIntake: parseFloat(calorieIntake),
          bodyWeight: parseFloat(weight),
          mood: parseFloat(mood),
        }
      );
      console.log("Form data saved:", response.data);
      setCalorieIntake("");
      setWeight("");
      setFormSaved(true);
      setErrorMessage("");
      setActivities([...activities, response.data]);
    } catch (error) {
      console.error("Error saving form data:", error);
      setErrorMessage("Check-in Completed for today already.");
    }
  };

  const handleInputChange = (e, setValue) => {
    const inputValue = e.target.value;
    if (!isValidInput(inputValue)) {
      setErrorMessage("Please enter a valid number.");
    } else {
      setErrorMessage("");
    }
    setValue(inputValue);
  };

  const isValidInput = (value) => {
    // Use regex to check if the input is a valid number
    const numberRegex = /^-?\d+(\.\d*)?$/;
    return numberRegex.test(value);
  };

  return (
    <div className="form-containerja">
      {activities.some(
        (activity) =>
          getNumberedDate(new Date(activity.entry_date)) === getNumberedDate()
      ) ? (
        <div className="check-in-message">
          Check-in Completed for {getFormattedDate()}
        </div>
      ) : (
        <form className="activity-form">
          <div className="title">{getFormattedDate()}</div>
          <label>
            Calorie Intake:
            <input
              type="text"
              value={calorieIntake}
              onChange={(e) => handleInputChange(e, setCalorieIntake)}
            />
          </label>

          <label>
            Current Weight:
            <input
              type="text"
              value={weight}
              onChange={(e) => handleInputChange(e, setWeight)}
            />
          </label>

          <label>
            Current Mood:
            <div>
              1 - Very Sad
              <br />
              10 - Very Happy
            </div>
            <select
              value={mood}
              onChange={(e) => handleInputChange(e, setMood)}
            >
              <option value="">Select Mood</option>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </label>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      )}
    </div>
  );
}
