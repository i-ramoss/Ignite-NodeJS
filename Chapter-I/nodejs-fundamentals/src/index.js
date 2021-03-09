const express = require('express')

const PORT = 3333

const app = express()

app.get('/', (request, response) => {
  return response.json({ welcome: 'Ignite Started! 🚀'})
})

app.get('/courses', (request, response) => {
  return response.json(["Course 1", "Course 2", "Course 3"])
})

app.post('/courses', (request, response) => {
  return response.json(["Course"])
})

app.put('/courses/:id', (request, response) => {
  return response.json(["Course 9", "Course 2", "Course 8", "Course 4"])
})

app.delete('/courses/:id', (request, response) => {
  return response.json(["Course 9", "Course 8", "Course 4"])
})

app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))