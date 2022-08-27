import React from 'react'

const PersonInput = ({text, name, value, onChange}) => {
  return(
    <div>
      {text}
      <input 
        name = {name}
        value = {value}
        onChange = {onChange}   />
    </div>
  ) 
}

export default PersonInput