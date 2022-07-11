import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { toast } from 'react-toastify'
import axios from "axios"

import './Messages.scss'

const Messages = ({ token }) => {
  const [messages, setMessages] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:4000/api/messages", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.data.data)
      .then(data => {
        setMessages(data)
      })
  }, [token])

  const handleClick = (index) => {
    setSelectedChat(index)
  }

  const handleChange = (e) => {
    setReplyMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()    

    let body = {
      email: messages[selectedChat].email,
      message: replyMessage,
      source: "admin"
    }

    axios.post("http://localhost:4000/api/messages", body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        toast.success("Message sent!")        
        setReplyMessage("")
      })
      .catch(err => {        
        toast.error("Failed to send message")
      })

  }

  return (
    <div className='messages'>
      <div className='messages__container'>
        {messages.length > 0 ?
          messages.map((sender, index) => (
            <div className='message__item' key={index} onClick={() => handleClick(`${index}`)}>
              <div className='item__avatar'>{`${sender.fullName.split(" ")[0][0]}${sender.fullName.split(" ")[1][0]}`}</div>
              <div className='item__content'>
                <h4>{sender.fullName}</h4>
                <h4>{sender.email}</h4>
                {sender.Messages.length > 0 && (
                  <p>{sender.Messages[0].message.slice(0, 20)}</p>
                )}
              </div>
            </div>
          ))
          : (
            <div>No messages  found!</div>
          )}
      </div>

      {selectedChat && (
        <div className='chat__container'>
          <div className='chat__header'>
            <h4>{messages[selectedChat].fullName}</h4>
            <button onClick={() => setSelectedChat(null)}><AiOutlineClose /></button>
          </div>
          <div className='chat__body'>
            {messages[selectedChat].Messages.map((message, index) => (
              <div className='chat__item' key={`${index}${message.id}`}>
                <div className='item__message'>{message.message}</div>
                <div className='item__time'>10:19 am</div>
              </div>
            ))
            }
          </div>
          <div className='chat__actions'>
            <form onSubmit={handleSubmit}>
              <textarea type="text" name="message" value={replyMessage} onChange={handleChange} />
              <button type='submit'><AiOutlineSend /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
