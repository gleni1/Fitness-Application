import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './AddExercise.css'


const AddExercise = ({edditedItems, workoutId, handleClick }) => {
    const [clicked, setClicked] = useState(false);
    const [exercisesList, setExercisesList] = useState([]);
    const [show, setShow] = useState(true);



    useEffect(() => {
        const fetchExercisesList = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_HOST}/exercisesList`);
                // console.log(res.data);
                setExercisesList(res.data.surveyData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchExercisesList();
    }, [exercisesList]);

    const handleNewExercise = async (selectedId) => {
        const data = { selectedId: selectedId || 1 };
        try {
          const res = await axios.post(`${process.env.REACT_APP_HOST}/addNewExercise/${workoutId}`, data);
          console.log("successsssss");
        //   window.location.reload();
          handleClick();
        //   setShowDiv1(true);
        // setClicked1(false);
        } catch (err) {
          console.log('errrrrrrrrrrr', err.response);
        //   setShow(true);
        alert("The exercise you're trying to add already exists in this workout. Please choose another exercise!")
      };
    }


    const [exerciseName, setExerciseName] = useState('');
    const [selectedId, setSelectedId] = useState('');

    const handleChange = (e) => {
        setExerciseName(e.target.value);
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedId(selectedOption.id);
    };
  

  return (
    <>
        
   
   
            <div className='popup'>
            <div className='overlay1' onClick={handleClick}></div>
            <div className="exercise-modal">

            <div className='exercise-content' >
                <span style={{fontSize:"2rem"}}>ADD NEW EXERCISE</span>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <select name="equipment_name" className='select-menu' value={exerciseName} onChange={handleChange}> 
                            {exercisesList && exercisesList.map(exercise => (
                                <option key={exercise.exercise_id} id={exercise.exercise_id} value={exercise.exercise_name}>{exercise.exercise_name}</option>
                                ))}
                        </select>
                    </div>
                    <div>
                        {exercisesList && exercisesList.map((exercise) => {
                            if (exercise.exercise_name === exerciseName) {
                                return <div className='exercise-steps' key={exercise.exercise_id}>{exercise.steps}</div>;
                            } else {
                                return null; // or return any default element if needed
                            }
                        })}
                    </div>
            </div>

            <div className='buttons'>
                <button className='request1' onClick={()=>handleNewExercise(selectedId)}>Add exercise</button>
                <button className='request2' onClick={handleClick}>Cancel</button>
            </div>

            </div>
        </div>
    
        
        
        {/* {show &&
        <div className='alert-popup'>
        <div className='overlay1' onClick={handleClick}></div>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible className=''>
                <Alert.Heading>Oh snap!</Alert.Heading>
                <p>
                The exercise you're trying to add already exists in your workout. Please choose another exercise!
                </p>
            </Alert>
        </div>
        }
     */}
    
    </>
  )
}

export default AddExercise
