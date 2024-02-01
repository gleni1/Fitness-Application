import React, { useState } from 'react';
import './styles/survey.css';

function CoachSurvey({ onClose }) {
  const [surveyData, setSurveyData] = useState({
    experience: '',
    cost: '',
    goal: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSurveySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const userID = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const surveyDataWithUserId = { userID, ...surveyData };
    try {
      const response = await fetch(process.env.REACT_APP_HOST + '/coach-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyDataWithUserId),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      onClose();
    } catch (error) {
      setError('Failed to submit survey. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="survey-modal-backdrop">
      <div className="survey-modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSurveySubmit}>

          <input type="number" name="experience" placeholder="*EXPERIENCE (IN YEARS)" required onChange={handleChange} />
          <input type="number" name="cost" placeholder="*COST ($AMNT/HR)" required onChange={handleChange} />
          <div className="form-group">
            <label>*FITNESS GOAL:</label>
            <select
              name="goal"
              value={surveyData.goal}
              onChange={handleChange}
              required
            >
              <option value="">Select goal</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="Enhance Flexibility">Enhance Flexibility</option>
            </select>
          </div>
          {error && <div className="alert aler-danger">{error}</div>}
          <button type="submit" className="finish-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'FINISH'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CoachSurvey;