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

}

const Messages = () => {
  const [contacts, setContacts] = useState<ContactAtrrs[]>([])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [replyMessage, setReplyMessage] = useState("")

  useEffect(() => {
    axios.get(baseUrl + "api/messages",{withCredentials:true})
      .then(res => res.data.data)
      .then(data => {        
        setContacts(data)
      })
  }, [])

  const handleClick = (index: number) => {
    setSelectedChat(index)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let body = {
      email: contacts[selectedChat as number].email,
      message: replyMessage,
      source: "admin"
    }

    axios.post(baseUrl + "api/messages", body, {
      headers: {
        "Content-Type": "application/json",
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
        {contacts.length > 0 ?
          contacts.map((sender, index) => (
            <div className='message__item' key={index} onClick={() => handleClick(index)}>
              <div className='item__avatar'>{`${sender.fullName.split(" ")[0][0]}${sender.fullName.split(" ")[1][0]}`}</div>
              <div className='item__content'>
                <h4>{sender.fullName}</h4>
                <h4>{sender.email}</h4>
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
            <h4>{contacts[selectedChat].fullName}</h4>
            <button onClick={() => setSelectedChat(null)}><AiOutlineClose /></button>
          </div>
          <div className='chat__body'>
            {contacts[selectedChat].messages.map((message, index) => (
              <div className='chat__item' key={`${index}${message._id}`}>
                <div className='item__message'>{message.message}</div>
                <div className='item__time'>10:19 am</div>
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
