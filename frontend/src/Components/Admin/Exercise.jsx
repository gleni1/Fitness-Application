import React from 'react'
import './Exercise.css'


const Exercise = ({elements, onUpdateStatus}) => {

 
  const exerciseStatus = elements.status === 'deactivated' ? 'deactivated' : 'activated';

  const handleUpdateStatus = (exercise_id, actionType) => {
    onUpdateStatus(exercise_id, actionType);
    fetch(`${process.env.REACT_APP_HOST}/updateExercise/${exercise_id}/${actionType}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {    
        console.log(`Exercise ${exercise_id} ${actionType}d:`, result);
      })
      .catch((error) => {
        console.error(`Error ${actionType}ing exercise:`, error);
      });
  };

  

  return (
    <>
      <div className='exerciseContainer'>
          <div className="exerciseContent">
              <h3 id='exerciseName'>{elements.exercise_name}</h3>
              <h5 className={exerciseStatus}>Status: {elements.status}
                <button className='activate' onClick={() => handleUpdateStatus(elements.exercise_id, 'activate')}>Activate</button> 
                <button className='deactivate' onClick={() => handleUpdateStatus(elements.exercise_id, 'deactivate')}>Dectivate</button>
                </h5>
              <h5>Equipment: {elements.equipment_list}</h5>
              <h5>Muscle: {elements.muscle}</h5>
              <h5>Steps: {elements.steps}</h5>
          </div>
      </div>

      
    </>
  )
}

export default Exercise
