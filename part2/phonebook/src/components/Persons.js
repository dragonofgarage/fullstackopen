import React from "react"

const PersonInfo = ({data, handleDelete}) => {

  return(
    <div>
      {data.map(person => (
        <p key = {person.id}>
          {person.name} {person.number}
           <button onClick={() => handleDelete(person)}>Delete</button>
        </p>
      ))}
    </div>
  )
}

//Display the list, also having the filtering function.
const Persons = ({persons, showForEnter, handleDelete}) => {
  if(showForEnter)
  {
    const temp = persons.filter(person =>{
      const regex = new RegExp(`${showForEnter}`, 'i')
      if(person.name.search(regex) === -1)
        return 0
      else
        return 1
    })
    return(
      <PersonInfo data = {temp} />
    )
  }
  return(
      <PersonInfo data = {persons} handleDelete = {handleDelete} />
  )
}


export default Persons