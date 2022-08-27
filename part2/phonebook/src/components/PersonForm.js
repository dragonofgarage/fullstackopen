import React from 'react'
import PersonInput from './PersonInput'

const PersonForm = ({onSubmit, newName, newNum, onChange }) =>
{
  return(
    <form onSubmit={onSubmit}>
      <PersonInput 
      text = 'name: '
      name = 'name'
      value = {newName}
      onChange = {onChange}
      />
      <PersonInput 
      text = 'number: '
      name = 'number'
      value = {newNum}
      onChange = {onChange}
    />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm