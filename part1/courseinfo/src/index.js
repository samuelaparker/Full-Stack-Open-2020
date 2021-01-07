import React from 'react';
import ReactDOM from 'react-dom';


const Course = ({ value}) => {
  console.log(value.parts)
  //   let sum = parts.reduce((a, value.excercises ) => a + value.exercises, 0);
  // }
  return (
    <div>
    <Header value={value.name} />
    {value.parts.map(n => <Content key={n.id} value={n} />)}
    </div>
  )
}

const Header = ({value}) => {
  return (
    <div>
      <h2>
        {value}
      </h2>
    </div>
  )
}

const Content = ({value}) => {
    return (
      <div>
        {value.name} {value.exercises}
        {/* {total here} */}
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
    <h1>Web development curriculum</h1>
      {courses.map(n => <Course key={n.id} value={n} />)}
    </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))