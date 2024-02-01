import React from 'react'
import './styles/ClientWorkouts.css'
import ClWorkoutsPage from './WorkoutPlan/ClWorkoutsPage'

const ClientWorkouts = ({userId}) => {
  return (
    <>
        <div className="myClientWorkouts">
            <div className="clientsWorkout-txt">
                
            </div>
            <ClWorkoutsPage userId={userId}/>
        </div>
    </>
  )
}

export default ClientWorkouts