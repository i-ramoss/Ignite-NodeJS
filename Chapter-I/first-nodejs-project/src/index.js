const express = require('express')
const { v4: uuidv4 } = require('uuid')

const PORT = 3333

const app = express()

app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
  const { name, cpf } = request.body

  const customerAlreadyExists = customers.some( customer => customer.cpf === cpf)

  if (customerAlreadyExists) return response.status(400).json({ error: 'Customer already exists!' })

  customers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  })

  return response.status(201).send(customers)
})

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params

  const customer = customers.find( customer => customer.cpf === cpf)

  if (!customer) return response.status(404).json({ err: 'Customer do not exists!' })

  if (customer.statement.length == 0) return response.status(204).json(customer.statement)

  return response.json(customer.statement)
})

.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))