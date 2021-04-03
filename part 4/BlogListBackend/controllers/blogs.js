const blogsRouter = require('express').Router()
//Blog is the mongoose model
//Models are responsible for creating and reading documents from the underlying MongoDB database.
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //blog (lowercase) is a document (an instance of a model)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
  })
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const post = {
      title: body.title,
      url: body.url,
      likes: body.likes
    }
  
    Blog.findByIdAndUpdate(request.params.id, post, { new: true })
      .then(updatedNote => {
        response.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })
  

module.exports = blogsRouter