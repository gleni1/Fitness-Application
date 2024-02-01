import './CoachChat.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useRef} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import axios from 'axios';

import sendIcon from '../../Components/icons/send1.png';

const CoachChat = ({userId}) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatMessages, setSelectedChatMessages] = useState(['']);
    const [sideName, setSideName] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const navigate = useNavigate();

    
    // THIS SHOULD BE RETRIEVED ON LOGIN //
    const coachId = userId; 
    // ********************************** //

    const [newMessage, setNewMessage] = useState({
        message: "",
        chatId: "", //should be retrieved based on who the coach is and which client chat he clicked on
        sender_id: 2, 
        receiver_id: "5",
        last_update: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })

    const isMessageReadyToSend = () => {
        const { message, chatId, sender_id, receiver_id } = newMessage;
        return message && chatId && sender_id && receiver_id;
      };

    const handleChange = (e) => {
        setNewMessage((prev)=>({...prev, [e.target.name]:e.target.value}))
        setCurrentMessage(e.target.value);
    }

    const updateChatId = (newChatId) => {
        setNewMessage((prev) => ({...prev, chatId: newChatId}));
    };
    const updateReceiverId = (newReceiverId) => {
        setNewMessage((prev) => ({...prev, receiver_id: newReceiverId}));
    };


    const handleNewMessage = async(e)=>{
        e.preventDefault();
        try{
            await axios.post(process.env.REACT_APP_HOST+"/newMessage", newMessage);
            setSelectedChatMessages([...selectedChatMessages, newMessage])
            setCurrentMessage('');
            alert('here');
        }catch(err){
            console.log(err); 
        }
    }

    /* RETRIEVE ALL MESSAGES FROM DATABASE */
    useEffect(()=>{
        const FetchAllMessages = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_HOST}/messages/chat/${coachId}`)
                console.log(res.data.surveyData);
                setMessageList(res.data.surveyData);
            }catch(err){
                console.log(err);
            }
        }
        FetchAllMessages();
    },[userId])

    useEffect(()=>{
        const FetchChats = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_HOST}/messages/coach/${coachId}`)
                setChats(res.data.surveyData);
                // console.log('this one' + chats);
            }catch(err){
                console.log(err);
            }
        }
        FetchChats();
    }, [chats]);

    useEffect(()=>{
        const FetchUsers = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_HOST}/users/${coachId}`)
                setUsers(res.data.surveyData);
                console.log(users);
            }catch(err){
                console.log(err);
            }
        }
        FetchUsers();
    }, [userId]);

    
    const chatsRef = useRef(chats);

    useEffect(() => {

      chatsRef.current = chats;
    }, [chats]);
    
    useEffect(() => {
      const fetchAllSideNames = async () => {
        try {
          const names = [];
          for (const chat of chatsRef.current) {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/users1/${chat.coach_client_id}/${coachId}`);
            console.log(res.data.surveyData)
            if (res.data.surveyData[0] ) {
              const fullName = `${res.data.surveyData[0].first_name} ${res.data.surveyData[0].last_name}`;
              names.push(fullName);
            } else {
            //   names.push("Unknown User");
              console.log(res)

            }
          }
          setSideName(names);
        } catch (err) {
            console.log(err);
        }
      };
    
      if (chats.length > 0) {
        fetchAllSideNames();
      }
    }, [chats]);
    
    const handleChatClick = async (chatId, receiverId) => {
        setSelectedChatId(chatId);
        updateReceiverId(receiverId);
        updateChatId(chatId)
        // setSelectedClientId(chatId);
        // alert("ChatID: ", chatId)
        try {
            const res = await axios.get(`${process.env.REACT_APP_HOST}/messages1/chat/${chatId}`);
            setSelectedChatMessages(res.data.surveyData);
            updateChatId(chatId);

        //   console.log('data' + selectedChatMessages);
        } catch (err) {
          console.log(err);
        }
      };


      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleNewMessage(event);
          setCurrentMessage('');
        }
      };

    /* DISPLAY THE RECEIVED MESSAGE */
   



    // console.log(users.first_name);
    
  return (
    <div className='chat-window'>
            {users.first_name && 
                <div className="chat-header">
                    <p>{users.first_name}</p>
                </div>
            }

        <div className="chat-body">
            <div className="allClients">
                <span className='active-chats'>Active Chats</span>
                {chats && chats.map((chat, index)=>{
                    // console.log(chat.coach_client_id + "-------" + chat.receiver_id); 
                    return( 
                        <div 
                            key={chat.coach_client_id}
                            onClick={()=>{handleChatClick(chat.coach_client_id, ((chat.receiver_id === coachId) ? chat.sender_id : chat.receiver_id))}}
                            // className='one-client'
                            className={`one-client ${selectedClientId === chat.coach_client_id ? '-selected' : ''}`} // Apply 'selected' class based on state
                            // className={`${selectedClientId === chat.coach_client_id ? 'one-client-selected' : 'one-client'}`;
                        >
                            
                            <span>{sideName && sideName[index]}</span>
                        </div>
                    )
                })}
            </div>
            <ScrollToBottom className='message-container'>
                {Array.isArray(selectedChatMessages) && selectedChatMessages.map((messageContent)=>(
                    <div className='message' id={coachId === messageContent.receiver_id ? "you" : "other"} key={messageContent.message_id}>
                        <div>
                            <div className='message-content' style={{fontFamily:"Open Sans, sans-serif"}}>
                                <p style={{fontFamily:"Open Sans, sans-serif"}}>{messageContent.message}</p>
                            </div>
                            <div className='message-meta' style={{fontFamily:"Open Sans, sans-serif"}}>
                                <p id='time' style={{fontFamily:"Open Sans, sans-serif"}}>{messageContent && messageContent.last_update.split('T')[0]}</p>
                                <p id='author' style={{fontFamily:"Open Sans, sans-serif"}}>{messageContent.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input 
                type="text" 
                placeholder='Message'
                value={currentMessage}
                name='message'
                // onChange={(event)=>{
                //     setCurrentMessage(event.target.value);
                // }}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <img src={sendIcon} alt="" onClick={handleNewMessage}/>
        </div>
    </div>
  )
}

export default CoachChat


{/* {sideName && sideName[index] ? (
                            <span>{sideName[index]}</span>
                            ) : (
                            <span>Loading...</span>
                            )}
                            <p>client  {index}</p> */}