import React from 'react';
import './Input.scss';

interface InputAttrs{
    type:string;
    name:string;
    placeholder?:string;
    id:string;
    handleChange:(attrs:any)=>void;
    value?:any;
}

const Input:React.FC<InputAttrs> = ({ type, name, placeholder, id, handleChange, value}) => {
    return (
        <>
            {type === "file" ?
                (<input type={type} name={name} placeholder={placeholder} id={id} onChange={handleChange} multiple />)
                :
                (<input type={type} name={name} placeholder={placeholder} id={name} onChange={handleChange} value={value} />)
            }
        </>
    )
}

export default Input;