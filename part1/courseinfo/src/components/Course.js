import React from 'react';

const Course = ({ value}) => {
    let sum = value.parts.reduce((t, n) => t + n.exercises, 0 )
    return (
      <div>
      <Header value={value.name} />
      {value.parts.map(n => <Content key={n.id} value={n} />)}
      <h3>total of {sum} exercises </h3>
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
        </div>
      )
  }

  export default Course
