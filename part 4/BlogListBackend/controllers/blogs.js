const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    ...body,
    
  })
  try {
    const savedBlog = await blog.save()
  response.json(savedBlog)
  } catch(exeption) {
    next(exeption)
  }

})


  module.exports = blogsRouter