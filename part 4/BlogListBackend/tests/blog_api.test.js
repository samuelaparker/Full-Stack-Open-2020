const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./test_helper')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })


// beforeEach(async () => {
//   await Blog.deleteMany({})
//   let blogObject = new Blog(initialBlogs[0])
//   await blogObject.save()
//   blogObject = new Blog(initialBlogs[1])
//   await blogObject.save()
// })


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('check that all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

test('check if blogs have id property', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body.map(blog => blog.id)).toBeDefined()
})

test('a valid note can be added', async () => {
  const newPost = {
    title: 'Building Good Study Habits',
    author: 'Mathew Salavitch',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain('Building Good Study Habits')
})

test('when blog\'s likes is not set it will be set to 0', async () => {
  const newPost =  {
    title: 'Look at this!',
    author: 'Dingus Mcgee',
    url: 'https://github.com/samuelaparker',
    }

    await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogNoLikes = await Blog.findOne({
      title: 'Look at this!',
      author: 'Dingus Mcgee',
    })
    expect(blogNoLikes.likes).toBe(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
