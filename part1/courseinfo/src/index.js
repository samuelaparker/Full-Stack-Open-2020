import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

// const Total = ({ parts }) => {
//   let sum = parts.reduce((a, { exercises }) => a + exercises, 0);
//   return (
//     <p>Total of {sum} exercises</p>
//   )
// }

const Part = ({part}) => {
  
  return (
    <p>
    {part.name} {part.exercises}
    </p>    
  )
}
const Content = ({content, courses}) => {
  console.log(content)
  const part = content.map(part =>
    <Part key={part.id} part={part} />
    )
  return (
    <div>{part}</div>
  )
}
const Course = ({ courses }) => {
  const headers = courses.map(course => 
    <Header key={course.id} course={course} />
    ) 
  const content = courses.map((content, i) => 
    <Content key={i} content={content.parts} />
    )
  return (
    <div>{headers} {content}</div>
  )
}

const App = () => {
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
 
  return (
    
    <div>
      <Course courses={courses} />
      {/* <h4><Total courses={courses} /></h4> */}
    </div>
    
  )
}


ReactDOM.render(<App />, document.getElementById('root'))