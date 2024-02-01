import React from 'react'
import ClientRequests from '../Components/MyClients/ClientRequests'
import YourClients from '../Components/MyClients/YourClients'
import './styles/Clients.css'

const Clients = ({userId}) => {
  return (
    <>
        <div className="myClient">
            <div className="myClient-txt">
                <h1>My Clients</h1>
            </div>
            <ClientRequests userId={userId}/>
            <YourClients userId={userId}/>
        </div>
    </>
  )
}

export default Clients