const express = require('express')
const app = express()
const winston = require('winston')

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()
require('./startup/prod')(app)


// throw new Error('Testing')
//console.log(process.env)
const port = process.env.PORT || 3000

app.listen(port, () => winston.info(`Listening to port ${port}`))
