import express from 'express';

const PORT = 3333;

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hi TypeScript!' })
})

app.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))