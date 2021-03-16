import express from 'express';

const PORT = 3333;

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.json({ message: 'Hi TypeScript!' });
});

app.post('/course', (request, response) => {
  const { name } = request.body;

  return response.json({ name });
});

app.listen(PORT, () => console.log(`🔥️ Server is running at port ${PORT}`));
