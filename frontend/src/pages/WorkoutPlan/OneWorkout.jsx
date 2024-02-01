import React, { useEffect } from 'react'
import './OneWorkout.css'
import { useState } from 'react'
import EditWorkoutModal from './EditWorkoutModal';
import axios from 'axios';


const OneWorkout = ({elements, deleteWorkout}) => {

  const [clicked, setClicked1] = useState(false);
  const [exerciseCount, setExerciseCount] = useState('');
  const [workoutClicked, setWorkoutClicked] = useState('');

  const toggleBtn = (id) => {
    setClicked1(!clicked);
    setWorkoutClicked(id);
  }



  const workoutId = elements.workout_id;

  useEffect(() => {
    const fetchExerciseCount = ()=>{
      axios.get(`${process.env.REACT_APP_HOST}/exerciseCount/${workoutId}`)
        .then((response)=>{
          if(response.data.ok){
            setExerciseCount(response.data.surveyData[0].exercise_count);
          }else{
            console.log("error retrieving exercise count");
          }
        })
        .catch((error)=>{
          console.log("Error fetching data:", error);
        })
    };
    fetchExerciseCount();
  }, [elements]); 
  


  const MAX_DESCRIPTION_LENGTH = 100; // Set your desired maximum length

  // Assuming element.steps contains the description
  let limitedDescription = elements.steps;
  // Check if elements exist and limitedDescription has a length
  if (elements && limitedDescription && limitedDescription.length > MAX_DESCRIPTION_LENGTH) {
    limitedDescription = `${limitedDescription.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  }


  return (
    <>
      <div className='oneWorkoutContainer'>
          <div className="oneWorkoutContent">
              <h2 id='workoutTitle'>{elements.workout_name}</h2>
              <h5>GOAL: {elements.goal}</h5>
              <h5>DIFFICULTY: {elements.difficulty}</h5>
              {/* <h5>EQUIPMENT: {elements.equipment_name}</h5> */}
              <h5>MUSCLE GROUP: {elements.muscle}</h5>
              {/* <h5>DESCRIPTION: {limitedDescription}</h5> */}
              <h5>EXERCISE COUNT: {exerciseCount}</h5>
              <div className="myButton">
                  <button 
                    className='editButton'
                    onClick={()=>toggleBtn(elements.workout_id)}
                    >
                    EDIT WORKOUT</button>
              </div> 
          </div>
        </div>

      {clicked && (
        <div className="editModal">
          <EditWorkoutModal setClicked1={setClicked1} items={elements} deleteWorkout={deleteWorkout} />
        </div>
      )}
    </>
  )
}

export default OneWorkout