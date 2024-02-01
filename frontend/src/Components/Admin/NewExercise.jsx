import React, { useState } from 'react'
import './NewExercise.css'
import {v4 as uuidv4} from 'uuid';
import Select from 'react-select';


const NewExercise = ({setClicked, addExercise}) => {

    const [exerciseData, setExerciseData] = useState({
        id: uuidv4(),
        exerciseName: '',
        exerciseEquipment: [],
        muscle: '',
        steps: ''
    })
    const equipmentOptions = [
        { value: 1, label: 'Barbell' },
        { value: 2, label: 'Dumbell' },
        { value: 3, label: 'Bodyweight' },
        { value: 4, label: 'Machine' },
        { value: 5, label: 'Kettlebells' },
        { value: 6, label: 'Cables' },
        { value: 7, label: 'Band' },
      ];
      // ('legs','core','arms','chest','shoulders','full body','cardio','flexibility','back'),
      const muscleOptions = [
        { value: 'legs', label: 'Legs' },
        { value: 'core', label: 'Core' },
        { value: 'arms', label: 'Arms' },
        { value: 'chest', label: 'Chest' },
        { value: 'shoulders', label: 'Shoulders' },
        { value: 'full body', label: 'Full Body' },
        { value: 'cardio', label: 'Cardio' },
        { value: 'flexibility', label: 'Flexibility' },
        { value: 'back', label: 'Back' },
      ];
    const handleInputChange = (event)=>{
        const {name, value} = event.target;
        setExerciseData({
            ...exerciseData,
            [name]: value,
        });
    };
    const handleEquipmentChange = (event) => {
        const vals = event.map((option) => option.value);
        exerciseData.exerciseEquipment = event;
        setExerciseData({ ...exerciseData, exerciseEquipment: vals });
      };
      const handleMuscleChange = (event) => {
        const val = event ? event.value : null;

        setExerciseData({ 
            ...exerciseData, 
            muscle: val });
      };

    const validateFields = () => {
        const requiredFields = ['exerciseName', 'steps'];
        for (const field of requiredFields) {
            if (!exerciseData[field].trim()) {
                return false; 
            }
        }
        return true; 
    };


    const handleAddExercise = () => {
        const isValid = validateFields();
        const requestData = {
            exercise_id: exerciseData.exercise_id,
            exercise_name: exerciseData.exerciseName,
            steps: exerciseData.steps,
            equipmentList: exerciseData.exerciseEquipment,
            muscle: exerciseData.muscle,
          };
          // exercise names instead of id
          const selectedEquipment = exerciseData.exerciseEquipment.map(value => {
            const option = equipmentOptions.find(option => option.value === value);
            return option ? option.label : value;
          });
        if(isValid){
            fetch(`${process.env.REACT_APP_HOST}/addExercise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((result) => {    
                    console.log(`Exercise Added:`, result);
                    const requestData2 = {
                        exercise_id: result[0].insertId,
                        status: "activated",
                        exercise_name: exerciseData.exerciseName,
                        steps: exerciseData.steps,
                        equipment_list: selectedEquipment.join(', '),
                        muscle: exerciseData.muscle
                      };
                    addExercise(requestData2); 
            })
                .catch((error) => {
                    console.error(`Error adding exercise:`, error);
            });
            toggleModal();
        }else{
            alert("Please fill all fields.");   
        }
    };

    const [modal, setModal] = useState(true);
    const toggleModal = ()=>{
        setModal(!modal)   
    }

    const handleButtonClick = ()=>{
        toggleModal();
        setClicked(false);
    }
    const dropdownStyle = {
        control: (provided) => ({
          ...provided,
          marginTop: '10px',
          border: '1px solid black', 
          borderRadius: '10px', 
        }),
        option: (provided) => ({
            ...provided,
            color: 'black',
          }),
      };

  return (
    <>
    {modal && (
        <div>
            <div className='overlay2' onClick={handleButtonClick} ></div>
            <div className="myModal">
                <div className="allComponents">

                    <div className="headerDiv">
                        <span className='header'>Add Exercise</span>
                    </div>
                    
                    <div className="addExerciseModal">
                        <div className="exerciseElements">
                            <span>Exercise Name:</span><br />
                            <span>Equipment:</span><br />
                            <span>Muscle:</span><br />
                            <span>Steps:</span><br />
                        </div>

                        <div className="dropdownButtons">

                            <input style={{display:"block", marginTop:"15px"}} name='exerciseName' value={exerciseData.exerciseName} onChange={handleInputChange}/>
                            <Select
                                styles={dropdownStyle}
                                // className="multi-select"
                                options={equipmentOptions}
                                isMulti
                                value={equipmentOptions.filter(option => exerciseData.exerciseEquipment.includes(option.value))}
                                onChange={handleEquipmentChange}
                                placeholder="Select Equipment"
                                
                            />
                            <Select
                                styles={dropdownStyle}
                                // className="multi-select"
                                options={muscleOptions}
                                value={muscleOptions.find(option => option.value === exerciseData.muscle)}
                                //value={exerciseData.muscle}
                                onChange={handleMuscleChange}
                                placeholder="Select Muscle"
                                
                            />
                            <textarea 
                                style={{marginTop:"20px", borderRadius:"10px"}} 
                                rows="4" cols="50" 
                                className="customTextarea" 
                                placeholder="Enter steps here..."
                                name='steps'
                                value={exerciseData.steps}
                                onChange={handleInputChange}
                            ></textarea>

                        </div>
                    </div>

                    <div className="addButton">
                        <button className='add' onClick={handleAddExercise}> Add Exercise</button>
                    </div>
                </div>
            </div>
        </div>
    )}
        </>
        )
}

export default NewExercise