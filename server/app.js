const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const routes = require('./routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', routes)

app.use("/static", express.static('./static/'))

app.get('/page', (req, res) => {
  res.sendFile(path.join(__dirname + '/../static/index.html'))
})

app.listen(PORT, ()  => {
  console.log(`Server runnig at: http://localhost:${PORT}`)
})