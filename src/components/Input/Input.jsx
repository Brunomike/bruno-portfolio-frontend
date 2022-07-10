import React from 'react'
import './Input.scss'

const Input = ({ type, name, placeholder, id, handleChange, value,multiple }) => {
    return (
        <>
            {type === "file" ?
                (<input type={type} name={name} placeholder={placeholder} id={id} onChange={handleChange} value={value} multiple />)
                :
                (<input type={type} name={name} placeholder={placeholder} id={id} onChange={handleChange} value={value} />)
            }
        </>
    )
}

export default Input