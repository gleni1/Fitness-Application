import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './EditWorkoutModal.css'
import OneExercise from './OneExercise';
import plusIcon from '../../Components/icons/plus.png'
import AddExercise from './AddExercise';

const EditWorkoutModal = ({setClicked1, items, deleteWorkout}) => {

    const [editedItems, setEditedItems] = useState(items); // Local state to handle changes
    const [exercises, setExercises] = useState([]);
    const [showAddExercise, setShowAddExercise] = useState(false);
    

    const handleClick = () => {
        setShowAddExercise(!showAddExercise);
    };
    // console.log(items);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItems({
        ...editedItems,
        [name]: value,
        });
    };

    const workoutId = items.workout_id;
    const oldMuscleId = items.muscle_id;


    const handleSaveChanges = async () => {
        try {
        const data = {editedItems, oldMuscleId};
          const res = await axios.put(`${process.env.REACT_APP_HOST}/sendWorkoutData/${workoutId}`, data);
          // console.log("successsssss");
          // setEditedItems(res.data.surveyData);
          // window.location.reload();
        //   setShowDiv1(true);
          // handleButtonClick();
        } catch (err) {
          console.log(err);
        }
        setClicked1();
      };


      useEffect(() => {
        const fetchAllExercises = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/allExercises/${workoutId}`);
            setExercises(res.data.surveyData);
            // setGoalsList(res.data.surveyData);
          } catch (err) {
            console.log(err);
          }
        };
        fetchAllExercises();
      }, [exercises]); 

      // console.log('------------------------',exercises);



    // const [modal, setModal] = useState(true);
    // const toggleModal = ()=>{
    //     setModal(!modal)   
    // }
    const handleButtonClick = ()=>{
        // toggleModal();
        setClicked1(false);
    }


    const deleteOneWorkout = async () => {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_HOST}/deleteOneWorkout/${workoutId}`);
          // console.log(res.data);
          // setCoachesList(res.data.surveyData);
          if (res.data.ok) {
            // setEditedItems(res.data.surveyData);
            // Do something if the response indicates success
            // alert('Successfully deleted request.')
            // window.location.reload();
            // setShowDiv(true);
          } else {
            alert('Workout couldnt be deleted');
            // Do something else if the response indicates failure
          }
        } catch (err) {
          console.log(err);
        }
      };


    // const handleDelete = (id) =>{
    //     deleteWorkout(id);
    //     setClicked1(false);
    //     // alert('hey ther' + id);
    // }
    // console.log('WORKOUT ITEMS: '+ items);

   

  return (
    <div>
        <div>
            <div className='overlay2' onClick={handleButtonClick} ></div>
            <div className="myModal">
                <div className="allComponents">

                    <div className="headerDiv">
                        <span className='header'>{items.workout_name}</span>
                    </div>
                    
                    <div className="workoutModal">
                        <div className="workoutElements">
                            <span>WORKOUT :</span><br />
                            <span>Goal:</span><br />
                            <span>DIFFICULTY:</span><br />
                            {/* <span>EQUIPMENT:</span><br /> */}
                            <span>TARGET MUSCLE GROUP:</span><br />

                            {/* <span>EXERCISE:</span><br /> */}

                            {/* <span>DESCRIPTION:</span> <br /> */}
                        </div>

                        <div className="dropdownButtons">

                            <input style={{display:"block", marginTop:"15px"}} name="workout_name" value={editedItems.workout_name || ''} onChange={handleInputChange}/>

                            <select className="workoutGoal" name="goal_id" value={editedItems.goal_id || ''} onChange={handleInputChange}> 
                                <option value="1">Gain Muscle</option> 
                                <option value="2">Lose Weight</option> 
                                <option value="3">Improve Endurance</option> 
                                <option value="4">Enhance Flexibility</option> 
                            </select>

                            <select name="difficulty" value={editedItems.difficulty || ""} onChange={handleInputChange}> 
                                <option value="beginner">Beginner</option> 
                                <option value="intermediate">Intermediate</option> 
                                <option value="advanced">Advanced</option> 
                            </select>

                            <select name="muscle_id" value={editedItems.muscle_id || ""} onChange={handleInputChange}> 
                                <option value="1">Legs</option> 
                                <option value="2">Core</option> 
                                <option value="3">Arms</option> 
                                <option value="4">Chest</option> 
                                <option value="5">Shoulders</option> 
                                <option value="6">Full Body</option> 
                                <option value="7">Cardio</option> 
                                <option value="8">Flexibility</option> 
                                <option value="9">Back</option> 

                            </select>
<br />
                        </div>
                    </div>
                   
                   <div className="exercises-parent">
                        <div className="exercises">
                            {exercises.map((exercise) => {
                                return (
                                    // JSX code here for each exercise
                                    <div className="one-exercise" key={exercise.exercise_id}>
                                        <OneExercise exerciseDetails={exercise} editedItems={editedItems}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    <div>
                        <img
                            src={plusIcon}
                            alt=""
                            className='plus-icon'
                            onClick={handleClick}
                        />
                        {showAddExercise && <AddExercise editedItems={editedItems} workoutId={items.workout_id} handleClick={handleClick} />}
                    </div>
                    <div className="addButton">
                        <button id='saveBtn' onClick={handleSaveChanges}>SAVE CHANGES</button>
                        <button id='deleteBtn' onClick={deleteOneWorkout}>DELETE WORKOUT</button>
                    </div>


                </div>
            </div>
        </div>
    </div>
  )
}

export default EditWorkoutModal


/*
const [editedItems, setEditedItems] = useState(items); // Local state to handle changes
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItems({
        ...editedItems,
        [name]: value,
        });
    };

    const handleSaveChanges = () => {
        // Pass the updated data to the parent component
        updateWorkout(editedItems);
        setClicked1(false);
      };
*/