import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from "axios";

import baseUrl from '../../../constants';
import './Messages.scss';

interface ContactAtrrs {
  _id: string;
  fullName: string;
  email: string;
  messages: MessageAttrs[];
}

interface MessageAttrs {
  _id: string;
  message: string;
  source: string;
  isRead: boolean;
  createdAt:string;
}

const Messages = () => {
  const [contacts, setContacts] = useState<ContactAtrrs[]>([])
  const [selectedChat, setSelectedChat] = useState<string>()
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    axios.get(baseUrl + "api/messages",{withCredentials:true})
      .then(res => res.data.data)
      .then(data => {
        setContacts(data.contacts)        
      })
  }, [])

  const handleClick = (index: string) => {
    setSelectedChat(index)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let currentContact = contacts.filter((contact) => contact._id === selectedChat)[0];

    let body = {
      email: currentContact.email,
      message: replyMessage,
      source: "admin"
    }

    axios.post(baseUrl + "api/messages", body, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
      .then(res => res.data)
      .then(data => {
        //console.log(data);
        toast.success("Message sent!")
        setReplyMessage("")
      })
      .catch(err => {
        toast.error("Failed to send message")
      })

  }
    
  let currentContact = contacts.filter((contact) => contact._id === selectedChat)[0];

  return (
    <div className='messages'>
      <div className='messages__container'>
        {contacts.length > 0 ?
          contacts.map((sender, index) => (
            <div className='message__item' key={index} onClick={() => handleClick(sender._id)}>
              <div className='item__avatar'>{`${sender.fullName.split(" ")[0][0]}${sender.fullName.split(" ")[1][0]}`}</div>
              <div className='item__content'>
                {/* <h4>{sender.fullName}</h4> */}
                <h5>{sender.email}</h5>
                {sender.messages.length > 0 && (
                  <p>{sender.messages[0].message.slice(0, 20)}</p>
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
            <h4>{currentContact.fullName}</h4>
            <button onClick={() => setSelectedChat("")}><AiOutlineClose /></button>
          </div>
          <div className='chat__body'>
            {currentContact.messages.map((message, index) => (
              <div className='chat__item' key={`${index}${message._id}`}>
                <div className='item__message'>{message.message}</div>
                <div className='item__time'>{new Date(message.createdAt).toLocaleTimeString()}</div>
              </div>
            ))
            }
          </div>
          <div className='chat__actions'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="message">Message</label>
              <textarea name="message" value={replyMessage} onChange={handleChange} />
              <button type='submit'><AiOutlineSend /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
