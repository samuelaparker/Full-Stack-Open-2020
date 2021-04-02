const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('check that all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })    
})

describe('viewing a specific note', () => {

  test('check if blogs have id property', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body.map(blog => blog.id)).toBeDefined()
  })

  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.blogsInDb()
    const noteToView = notesAtStart[0]
    const resultNote = await api
      .get(`/api/blogs/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
    expect(resultNote.body).toEqual(processedNoteToView)
  })
})

describe('addition of a new note', () => {

  test('a valid blog can be added', async () => {
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
    const newPost = {
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

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('fails with status code 400 if data is invalid', async () => {
    const newBlogNoUrl = {
      title: 'Type wars',
      author: 'Robert C. Martin',
    }
    const newBlogNoTitle = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
    await api.post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
    await api.post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
    const blogsAtDb = await helper.blogsInDb()
    expect(blogsAtDb.length).toBe(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})


