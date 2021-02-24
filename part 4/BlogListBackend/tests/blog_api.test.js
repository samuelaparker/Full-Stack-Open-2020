const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('check that all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(response.body.length)
  })

afterAll(() => {
  mongoose.connection.close()
})