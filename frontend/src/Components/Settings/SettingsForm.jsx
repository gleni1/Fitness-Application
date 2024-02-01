import React, { useState, useEffect } from "react";
import './SettingsForm.css'
import Form from 'react-bootstrap/Form';

export default function SettingsForm() {
    console.log("HKJHJKH",localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = localStorage.getItem('userId');
    const [surveyData, setSurveyData] = useState({});
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [weeklyExercise, setWeeklyExercise] = useState('');
    const [dietLevel, setDietLevel] = useState('');
    const [goal, setGoal] = useState('');

    console.log("userID in SettingsForm.js ", userID);
    console.log("User in SettingsForm.js: ", user);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}/surveyfetch/${userID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Data from DB: ",data.surveyData);
                setSurveyData(data.surveyData[0]);
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        if (userID) {
            fetchSurveyData();
        }
    }, [userID]);

    const updateAccount = async () => {
        const updatedSurveyData = {
            fitness_level: fitnessLevel,
            weekly_exercise: weeklyExercise,
            diet: dietLevel,
            goal_id: goal
        };
    
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/updateSurvey/${userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSurveyData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle success
        } catch (error) {
            console.error('Error updating survey data:', error);
        }
    };
    

    return (
        <div className="allContent">
            <div className="form-container">
                <div className="upperHalf">
                    <div className="first-col">
                        <div className="form-field">
                            <label>*First Name: 
                                <span>
                                    <input type="text" value={user.first_name} readOnly/>
                                </span> 
                            </label>
                            
                        </div>
                        <div className="form-field">
                            <label>*Email: 
                            <span><input type="text" value={user[0].email} readOnly/></span> 
                            </label>
                        </div>
                        <div className="form-field">
                            <label>Phone: 
                            <span><input type="text" value={user.phone_number} readOnly/></span> 
                            </label>
                        </div>
                        <hr style={{ width: "190%", color: "black", height: "10px", border: "none", borderBottom: "3px solid white" }} />

                        
                        <div className="form-field">
                            <label>Fitness Level: </label>
                            <Form.Select aria-label="Fitness Level" value="{fitnessLevel}" onChange={e => setFitnessLevel(e.target.value)}>
                                <option>Fitness Level: {surveyData.fitness_level}</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </Form.Select>
                        </div>
                        <div className="form-field">
                            <label>Weekly Exercise: </label>
                            <Form.Select aria-label="Weekly Exercise" value="{weeklyExercise}" onChange={e => setWeeklyExercise(e.target.value)}>
                                <option>Weekly Exercise:  {surveyData.weekly_exercise}</option>
                                <option value="0-2">0-2/Week</option>
                                <option value="3-5">3-5</option>
                                <option value="6-8">6-8</option>
                                <option value="9+">9+</option>

                            </Form.Select>
                        </div>
                    </div>
                    <div className="second-col">
                        <div className="form-field">
                            <label>*Last Name: 
                            <span><input type="text" value={user.last_name} readOnly/></span> 
                            </label>
                        </div>
                        <div className="form-field">
                            <label>*PASSWORD: 
                            <span><input type="text" value={user[0].password} readOnly/></span> 
                            </label>
                        </div>
                        <div className="form-field">
                            <label>Role:
                            <span><input type="text" value={user.role} readOnly/></span> 
                            </label>
                        </div>
                        
                        <hr style={{ width: "160%", color: "black", height: "10px", border: "none", borderBottom: "3px solid white" }} />

                        <div className="form-field">
                            <label>Diet Level: </label>
                            <input 
                                type="number" 
                                aria-label="Diet level"
                                placeholder={surveyData.diet}
                                value={dietLevel} 
                                onChange={e => setDietLevel(e.target.value)}
                                min="1"   // This ensures only positive numbers are allowed
                            />
                        </div>
                        
                        <div className="form-field">
                            <label>Goal: </label>
                            <Form.Select aria-label="Goal:" value="{goal}" onChange={e => setGoal(e.target.value)}>
                                <option>Goal {surveyData.goal_id}</option>
                                <option value="1">1. Gain Muscle</option>
                                <option value="2">2. Lose Weight</option>
                                <option value="3">3. Improve Endurance</option>
                                <option value="4">4. Enhance Flexibility</option>

                            </Form.Select>
                        </div>
                    </div>
                </div>
                <div className="allButtons">
                    <button id="button1" onClick={updateAccount}>SAVE</button>
                </div>  
            </div>
        </div>
    );
}