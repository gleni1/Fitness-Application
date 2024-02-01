import React, { useState } from "react";
import "./styles/clientsurvey.css";

function ClientSurvey({ onClose }) {
  const [surveyData, setSurveyData] = useState({
    currentFitnessLevel: "",
    currentExerciseSchedule: "",
    currentDiet: "",
    fitnessGoal: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const userID = localStorage.getItem("userId");
    const surveyDataWithUserId = { userID, ...surveyData };
    console.log(
      "This will be inserted to client survey ",
      surveyDataWithUserId
    );
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(process.env.REACT_APP_HOST+"/client-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyDataWithUserId),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("From Client Survey, data, ", data);
      onClose();
    } catch (error) {
      setError("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="client-survey-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>*CURRENT FITNESS LEVEL:</label>
          <select
            name="currentFitnessLevel"
            value={surveyData.currentFitnessLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>*CURRENT EXERCISE SCHEDULE:</label>
          <select
            name="currentExerciseSchedule"
            value={surveyData.currentExerciseSchedule}
            onChange={handleChange}
            required
          >
            <option value="">Select schedule</option>
            <option value="0-2">0-2 hours/week</option>
            <option value="3-5">3-5 hours/week</option>
            <option value="6-8">6-8 hours/week</option>
            <option value="9+">9+ hours/week</option>
          </select>
        </div>

        <div className="form-group">
          <label>*CURRENT DIET:</label>
          <select
            name="currentDiet"
            value={surveyData.currentDiet}
            onChange={handleChange}
            required
          >
            <option value="">Select diet</option>
            <option value="2000">2000 CAL/week</option>
            <option value="2500">2500 CAL/week</option>
            <option value="3000">3000 CAL/week</option>
          </select>
        </div>

        <div className="form-group">
          <label>*FITNESS GOAL:</label>
          <select
            name="fitnessGoal"
            value={surveyData.fitnessGoal}
            onChange={handleChange}
            required
          >
            <option value="">Select goal</option>
            <option value="2">Lose Weight</option>
            <option value="1">Gain Muscle</option>
            <option value="3">Improve Endurance</option>
            <option value="4">enhance flexibility</option>
          </select>
        </div>
        {error && <div className="alert aler-danger">{error}</div>}
        <button type="submit" className="finish-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "FINISH"}
        </button>
      </form>
    </div>
  );
}
export default ClientSurvey;