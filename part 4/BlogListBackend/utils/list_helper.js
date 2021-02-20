const _ = require('lodash')

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

let favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    let arr = blogs.map(n => (n.likes))
    let i = arr.indexOf(Math.max(...arr))
    return blogs[i]
  }

}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const blogCountByAuthor = _.map(
      _.countBy(blogs, 'author'), (blogs, author) => ({ blogs, author })
    )
    return _.maxBy(blogCountByAuthor, 'blogs');
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else {
    let bloggerList = _.groupBy(blogs, 'author')
    let list = []
    _.forEach(bloggerList, (blogger) => {
      list.push({
        author: _.head(blogger).author,
        likes: _.sumBy(blogger, (blog) => (blog.likes))
      })
    })
    return  _.maxBy(list, 'likes');
  }
}

module.exports = {
  dummy,
  palindrome,
  average,
  totalLikes,
  favoriteBlogs, 
  mostBlogs,
  mostLikes,
}