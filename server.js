const express = require('express')
require('dotenv').config()
require('./Config/database');

const PORT = process.env.PORT
const modelRouter = require('./Router/modelRouter')
const app = express()

app.use(express.json())

app.use(modelRouter)
app.listen(PORT,() => {
  console.log(`My Server Is Listening On Port ${PORT}`)
});