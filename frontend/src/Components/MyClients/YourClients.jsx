import React, {useState, useEffect} from 'react'
import './YourClients.css'
import OneRequest from './ClientOneRequest'
import Stack from 'react-bootstrap/esm/Stack'
import YourClientExpanded from './YourClientExpanded'
import axios from 'axios';

const YourClients = ({userId}) => {
  const [clientsList, setClientsList] = useState([]);

  const coachId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_HOST}/acceptedClients2/${coachId}`);
        // console.log(res.data);
        setClientsList(res.data.surveyData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRequests();
  }, [clientsList]); 

  // alert(userId);

  return (
    <>
        <br />
      <div className='containerr1'>
        <div className='inContainer'>
          <span style={{marginLeft:"12px", color:"white"}}>YOUR CLIENTS</span>
                  {clientsList && clientsList.length>0 ? (
                    clientsList.map((client, index) => (
                      <Stack key={index} gap={3}>
                          <div className='p-2'><YourClientExpanded items={client} userId={userId}/></div>
                      </Stack>
                  ))
                  ) : (
                    <h1 style={{padding:"20px", textAlign:"center"}}>You currently have no clients.</h1>
                    )
                }
        </div>
        </div>
    </>
  )
}

export default YourClients