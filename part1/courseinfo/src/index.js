import React from 'react';
import ReactDOM from 'react-dom';

// const Total = ({ parts }) => {
//   let sum = parts.reduce((a, { exercises }) => a + exercises, 0);
//   return (
//     <p>Total of {sum} exercises</p>
//   )
// }

//TEST!!!
const Course = ({ courses }) => {
  
  return (

    <div>
    {courses.map((n, i) =>
    <Header key={n.id} course={n.name} courses={courses} length={i} />
    )}
    {/* {courses.map(n =>
    <Content key={n.id} part={n.parts} /> 
    )} */}
    </div>
  )
}

const Header = ({course, courses, length}) => {
  return (
    <div>
    <h1>{course}</h1> 
    {courses.map((n, i) =>
    <Content key={n.id} part={n.parts} length={i} courses={n.part} /> 
    )}
    </div>
  )
}

const Content = ({part, length, courses}) => {
  // let numberOfCourses = length.length;
  console.log(part) //!!!!
    return (
      <div>
        {part.map(n => 
        <Part key={n.id} name={n.name} />
        )}
      </div>
    )
}

const Part = ({name}) => {
  
  return (
    <div>
      <p>{name}</p>
    </div>
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