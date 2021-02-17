

const dummy = () => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.length === 0 
  ? 0
  : blogs.reduce((acc, cur) => acc + cur.likes, 0)
}
const palindrome = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = (array) => {
    const reducer = (sum, item) => {
      return sum + item
    }
        return array.length === 0 
        ? 0
        : array.reduce(reducer, 0) / array.length
  }
  
  module.exports = {
    dummy,
    palindrome,
    average,
    totalLikes
  }