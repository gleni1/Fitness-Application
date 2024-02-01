import React from 'react'
import { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/esm/Stack'
import NewExercise from './NewExercise'
import Exercise from './Exercise'
import './ExerciseBank.css';

const ExerciseBank = () => {

    const [clicked, setClicked]= useState(false);
    const toggleBtn = ()=>{
        setClicked(!clicked);
    }
    
    
    const [exerciseList, setExerciseList] = useState([]);
    const handleUpdateStatus = (exercise_id, actionType) => {
      fetch(process.env.REACT_APP_HOST+'/exerciseList') 
          .then((response) => response.json())
          .then((data) => setExerciseList(data))
          .catch((error) => console.error('Fetch error:', error));
      setExerciseList(exerciseList => exerciseList);
    };
    const [currentPage, setCurrentPage] = useState(1);

    const items = 5;
    const start = (currentPage - 1) * items;
    const end = start + items;
  
    const onePage = exerciseList.slice(start, end);
      /*
        {
            exerciseName: "Push-ups",
            exerciseEquipment: ["Bodyweight"],
            steps: "Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your chest to the ground by bending your elbows while keeping your body in a straight line. Push back up to the starting position, fully extending your arms."
            
        },
        {
            exerciseName: "Sit-ups",
            exerciseEquipment: ["Bodyweight"],
            steps: "Lie on your back with your knees bent and your feet flat on the floor. Place your hands behind your head, engage your core, and lift your upper body off the ground. Lower your body back down and repeat, ensuring you do not pull on your neck during the movement."
        },
        {
            exerciseName: "Squats",
            exerciseEquipment: ["Bodyweight","Barbell"],
            steps: "Stand with your feet shoulder-width apart. Bend at your hips and knees, lowering your body as if you are sitting back into a chair. Push through your heels to stand back up, straightening your legs."
        },
        {
            exerciseName: "Plank",
            exerciseEquipment: ["Bodyweight"],
            steps: "Get into a push-up position with your forearms on the ground, elbows beneath your shoulders. Keep your body in a straight line from head to heels, engage your core muscles, and hold the position for the desired duration, focusing on maintaining proper form."
        }
      ])
      */
      const addExercise = (newExercise) =>{
        setExerciseList([newExercise,...exerciseList]);
      }
      useEffect(() => {
        fetch(process.env.REACT_APP_HOST+'/exerciseList') 
          .then((response) => response.json())
          .then((data) => setExerciseList(data))
          .catch((error) => console.error('Fetch error:', error));
      }, []);
    return (
        <>
            <div className='exerciseBank'>
            <span classname='title'><h3>All Exercises:  <button className='addExercise' onClick={toggleBtn}> Add Exercise</button></h3></span>
            {/* <div className="addDiv">
                <button className='addExercise' onClick={toggleBtn}> Add Exercise</button>
            </div> */}
            {clicked && (<NewExercise setClicked={setClicked} addExercise={addExercise} />)}
            {onePage.map((exercise)=>{
              return(
                
                  <Stack gap={3}>
                      <div className='p-2'><Exercise elements={exercise} onUpdateStatus={handleUpdateStatus}/></div>
                  </Stack>
                  
                 
                //   <DataContext.Provider value={{exerciseList, setExerciseList}}>
                //     <Exercise elements={exercise}/>
                // </DataContext.Provider>
                
              );  
            })}
            <div className='pageButtons'>
              <button className='pageButton' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}> Previous </button>
              <span>Page {currentPage}</span>
              <button className='pageButton' onClick={() => setCurrentPage(currentPage + 1)} disabled={end >= exerciseList.length}> Next</button>
            </div>
          </div>
    
        </>
      )
}

export default ExerciseBank
