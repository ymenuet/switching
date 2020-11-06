const express = require('express')
const formations = require('./data/formations')

const app = express()

app.get('/', (req, res) => {
  res.send('API running')
})

app.get('/api/formations', (req, res) => {
  res.json(formations)
})

app.get('/api/formations/:id', (req, res) => {
  const formation = formations.find((f) => f.id == req.params.id)
  res.json(formation)
})

app.listen(5000, console.log('server running on port 5000'))
