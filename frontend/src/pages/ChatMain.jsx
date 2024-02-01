import React from 'react'
import './styles/ChatMain.css'
import CoachChat from './Chat/CoachChat'

/*
Need function here to detect whether the logged user
is a coach or not. If coach, then we should call CoachApp,
otherwise we call App. CoachApp has a slightly different UI 
from App (clients chat box) .CoachApp has a list of chats on
the side, and each one contains the chat history of the coach 
with that client.
*/

const ChatMain = ({userId}) => {
  return (
    <div className='my-chat'>
        <h1 className='chat-title'>Chat Box</h1>
        <CoachChat userId={userId}/>
    </div>
  )
}

export default ChatMain