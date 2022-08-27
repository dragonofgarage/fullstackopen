import { useState, useEffect } from 'react'
import PersonInput from './components/PersonInput'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import pbService from './services/phonebook'
import './index.css'

const Message = ({message, redMessage}) => {
  if(message === null)
    return null
  if(redMessage === true)
    return(
      <div className = 'redMessage'>
        {message}
      </div>
    )
  return(
    <div className = 'messageStyle'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showForEnter, setShowForEnter] = useState('')
  const [message, setMessage] = useState(null)
  const [redMessage, setRedMessage] = useState(false)

  useEffect(() => {
    pbService
      .getAll()
      .then(initialValues => {
        setPersons(initialValues)
      })
  }, [])

// Checking if the element exist in the target array.
  const checkIfExist = (oldPerson, newPerson) =>{
    const temp = oldPerson.find( (person) => person.name === newPerson.name)
    return(
      temp ? 1 : 0
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNum,
    }

    if(checkIfExist(persons, personObject))
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const tempPerson = persons.find(person => person.name === personObject.name)
        const changeNum = {...tempPerson, number : newNum}

        pbService
          .change(tempPerson.id, changeNum)
          .then(response => {
            setMessage(`${response.data.name}'s num has been changed. `)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== tempPerson.id ? person : response.data))
          })
          .catch(error =>{
            setRedMessage(true)
            setMessage(`${tempPerson.name} has already been removed from server.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setTimeout(() => {
              setRedMessage(false)
            }, 5000)
            setPersons(persons.filter( n => n.id !== tempPerson.id))
          })
      }
    }
    else
    {
      pbService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNum('')
          setMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleInputChange = (event) =>
  { 
    if(event.target.name === 'name')
      setNewName(event.target.value)
    if(event.target.name === 'number')
      setNewNum(event.target.value)
    if(event.target.name === 'filtering')
      setShowForEnter(event.target.value)
  }

  const handleDeleteOf = (data) => {
    if(window.confirm(`Delete ${data.name} ?`)){
      pbService
        .delValue(data.id)
        .then(() => {
          const refreshPerson = persons.filter(person => person.id !== data.id)
          setPersons(refreshPerson)
          setRedMessage(true)
          setMessage(`${data.name} has been removed from server.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setTimeout(() => {
            setRedMessage(false)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message = {message} redMessage = {redMessage} />
      <PersonInput 
        text = 'Filter shown with'
        name = 'filtering'
        value = {showForEnter}
        onChange = {handleInputChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit = {addPerson}
        newName = {newName}
        newNum = {newNum}
        onChange = {handleInputChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons = {persons}
        showForEnter = {showForEnter}
        handleDelete = {handleDeleteOf}
      />
    </div>
  )
}

export default App