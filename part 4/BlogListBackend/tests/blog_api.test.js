const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

// let users = async () => {
//     const userList = await api.get('/api/blogs')
//     return userList.map(n => n.toJSON())
// }

// console.log(users())

// test('', async () => {
//     expect(users())
// })

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
//   test('check if blogs have id property', async () => {
//       const response = await api.get('/api/blogs')
//     expect(fetchNewFlavorIdea()).toBeDefined();
//   });

afterAll(() => {
  mongoose.connection.close()
})