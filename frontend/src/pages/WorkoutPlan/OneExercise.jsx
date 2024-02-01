import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './OneExercise.css'



const OneExercise = ({exerciseDetails, editedItems}) => {
    const [clicked, setClicked] = useState(false);
    const [exercisesList, setExercisesList] = useState([]);

    
    const handleClick = () =>{
        setClicked(!clicked);
    }

    
    useEffect(() => {
      const fetchExercisesList = () => {
        axios.get(`${process.env.REACT_APP_HOST}/exercisesList`)
          .then((response)=>{
            if(response.data.ok){
              setExercisesList(response.data.surveyData);
            }else{
              console.log("Error retrieving exercises.");
            }
          })
          .catch((errro)=>{
            console.log("Error fetching exercises");
          })
      }
      fetchExercisesList();
    }, [exercisesList]);

    

    const oldExerciseId = exerciseDetails.exercise_id;
    const workoutId = exerciseDetails.workout_id;

    const handleUpdateExercise = async (selectedId) => {
        const data = {oldExerciseId, selectedId}
        try {
          const res = await axios.put(`${process.env.REACT_APP_HOST}/updateExercise/${workoutId}`, data);
        //   console.log("successsssss");
          handleClick();
        //   updateExercise(res.data.surveyData); 
        //   setShowDiv1(true);
        // setClicked1(false);
        

        } catch (err) {
          console.log(err);
          // alert(err);
          alert('The exercise already exists. Please choose another one.');
        }
      };

      const deleteExercise = async () => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_HOST}/deleteExercise/${workoutId}`, {
                data: { oldExerciseId }
              });
          if (res.data.ok) {
            // Do something if the response indicates success
            // alert('Successfully deleted request.')
            // window.location.reload();
            handleClick();
            // setShowDiv(true);
          } else {
            alert('Request couldnt be deleted');
            // Do something else if the response indicates failure
          }
        } catch (err) {
          console.log(err);
        }
      };

    const [exerciseName, setExerciseName] = useState('');
    const [selectedId, setSelectedId] = useState('');


    const handleChange = (e) => {
        setExerciseName(e.target.value);
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedId(selectedOption.id);
    };
  

    // console.log(exercisesList);

    return (
        <>
        
        <div className='exercise-content' onClick={handleClick}>
            <div style={{fontSize:"2rem"}}>{exerciseDetails.exercise_name}</div>
            <div className='exercise-steps'>{exerciseDetails.steps}</div>
        </div>
        
        {clicked && (
            <div className='popup'>
            <div className='overlay1' onClick={handleClick}></div>
            <div className="exercise-modal">
                <div style={{display:"flex", flexDirection:"row"}}>
                    <button className='exercise-cancelButton' onClick={handleClick}>X</button>
                    <select name="equipment_name" className='select-menu' value={exerciseName} onChange={handleChange}> 
                        {exercisesList.map(exercise => (
                            <option key={exercise.exercise_id} id={exercise.exercise_id} value={exercise.exercise_name}>{exercise.exercise_name}</option>
                            ))}
                    </select>
                </div>

                {exerciseName ? (
                    <>
                        <span className='exercise-name'>{exerciseName}</span>
                        {exercisesList.map((exercise) => {
                            if (exercise.exercise_name === exerciseName) {
                                return <div className='exercise-steps' key={exercise.exercise_id}>{exercise.steps}</div>;
                            } else {
                                return null; // or return any default element if needed
                            }
                        })}
                    </>
                ) : (
                    <div>    
                        <span className='exercise-name'>{exerciseDetails.exercise_name}</span><br />
                        <span className='exercise-steps'>{exerciseDetails.steps}</span>
                    </div>
                    )}

                    {/* {console.log('**********************', selectedId)} */}
              <div className='buttons'>
                  <button className='request1' onClick={()=>handleUpdateExercise(selectedId)}>Save changes</button>
                  <button className='request2' onClick={deleteExercise}>Remove exercise</button>
              </div>
            </div>
          </div>
        )}
        
        </>
  )
}

export default OneExercise

