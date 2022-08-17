const express = require('express')

const inboundRouter = require('./routes/inbound.route')
const outboundRouter = require('./routes/outbound.route')

const app = express()

app.use(express.json())

app.use(inboundRouter)
app.use(outboundRouter)

app.all('/*', (req, res) => {
    res.status(405).send()
})

module.exports = app