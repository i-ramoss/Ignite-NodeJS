const express = require('express')
const { v4: uuidv4 } = require('uuid')

const PORT = 3333

const app = express()

app.use(express.json())

const customers = []

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find( customer => customer.cpf === cpf)

  if (!customer) return response.status(404).json({ err: 'Customer do not exists!' })

  request.customer = customer

  next()
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') return acc + operation.amount
    else return acc - operation.amount
  }, 0)

  return balance
}

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

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  return response.json(customer)
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request
  const { name } = request.body

  customer.name = name

  return response.json(customer)
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  customers.splice(customer, 1)

  return response.status(200).json(customers)
})

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  if (customer.statement.length == 0) return response.status(204).json(customer.statement)

  return response.status(201).json(customer.statement)
})

app.get('/statement/:date', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + ' 00:00')

  const statement = customer.statement.filter( statement => 
    statement.created_at.toDateString() === new Date(dateFormat).toDateString()
  )

  return response.json(statement)
})

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { amount, description } = request.body
  const { customer } = request

  if (amount <= 0) return response.status(400).json({ err: 'You cannot deposit amounts below R$ 1.00' })

  const statementOperation = {
    amount,
    description,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send(customer)
})

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request
  const { amount } = request.body

  if (amount <= 0) return response.status(400).json({ err: 'You cannot withdraw amounts below R$ 1.00' })

  const balance = getBalance(customer.statement)

  if(balance < amount) return response.status(400).json({ error: 'Insufficient funds!' })

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send(customer)
})

.listen(PORT, () => console.log(`🔥 Server started at http://localhost:${PORT}`))