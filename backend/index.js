const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()

connectToMongo()
const port = 5000

app.use(cors())
app.use(express.json()) //express.json() middleware is responsible for parsing the incoming request body with JSON payloads & is commonly used to handle and process JSON data sent in the request body.

// routes;-
app.use('/auth', require('./routes/AuthRoute'))
app.use('/notes', require('./routes/NotesRoute'))

app.listen(port,() => {
    console.log(`app listening on port ${port}`)
})