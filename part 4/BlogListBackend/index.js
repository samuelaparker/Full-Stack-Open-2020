const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const logger = require('./utils/logger')



const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://blog-user:7f4wSAsvYu1GCQw3@cluster0.idx6w.mongodb.net/FullstackBlog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())


const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})