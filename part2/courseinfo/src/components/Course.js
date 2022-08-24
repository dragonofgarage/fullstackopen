import React from 'react'

const Course = ({course}) => {
  return(
    <div>
      <Header />
      <Content course = {course} />
    </div>
  )
}

const Header = () => {
  return(
    <h1>Web development curriculum</h1>
  )
}

const Part = ({parts}) => {
  return(
  <div>
    {parts.map(
      (part) => {
        return(
          <p key = {part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
    )}
    </div>
  )
  
}

const Content = ({course}) => {
  return(
    <div>
      {course.map( (course) => {
        return(
          <div key = {course.id}>
            <h2>
              { course.name }
            </h2>
            <Part parts = { course.parts }/>
            <Total parts = {course.parts } />
          </div>
        )
      } )}
    </div>
  )
}

const Total= ({parts}) => {
  const total = parts.reduce(
    (prev, cur) => 
      prev + cur.exercises
  ,0 )

  return(
    <p>
      Total of {total} exercises
    </p>
  )
}

export default Course