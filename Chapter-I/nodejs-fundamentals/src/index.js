const express = require('express')

const PORT = 3333

const app = express()

app.get('/', (request, response) => {
  return response.json({ welcome: 'Ignite Started! 🚀'})
})

app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))