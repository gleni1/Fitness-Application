import React from 'react'
import { useState, useEffect } from 'react'
import ClientOneRequest from './ClientOneRequest'
import Stack from 'react-bootstrap/esm/Stack'
import "./ClientRequests.css"
import axios from 'axios';


const ClientRequests = ({userId}) => {
  const [clientsList, setClientsList] = useState([]);

  const coachId = userId;


  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/clientRequestsFetch/${coachId}`);
        console.log(res.data);
        setClientsList(res.data.surveyData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllRequests();
  }, [clientsList]); 

  const onClientStatusChange = (clientId, newStatus) => {
    if(newStatus === 'declined'){
      setClientsList(clientsList.filter(client => client.user_id !== clientId));
    }
    else{
      setClientsList(clientsList.map(client => {
        if(client.user_id === clientId) {
          return { ...client, status: newStatus };
        } else {
          return client;
        }
      }));
    }
  };
  


  console.log('clientsList:', clientsList);
  return (
    <>
        <div className='allRequestss'>
            <span className="text-wrapper1">PENDING CLIENT REQUESTS:</span>
                {clientsList && clientsList.length>0 ? (
                    clientsList.map((client, index) => (
                      <Stack gap={3} key={index} className='stack'>
                        <div className='p-0'><ClientOneRequest items={client}/></div>
                      </Stack>
                  ))
                  ) : (
                    <h1 style={{padding:"20px", textAlign:"center"}}>You currently have no requests.</h1>
                    )
                }
        </div>

    </>
  )
}

export default ClientRequests