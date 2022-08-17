const reqSchema = require("../validators/validator")
const inboundService = require("../services/inbound.services")
const errorResponse = require("../utils/errorResponse")

const inboundController = async (req, res) => {
    try {
        const value = await reqSchema.validateAsync(req.body)
        const result = await inboundService(value)

        res.status(result.status).send(result.response)
    }
    catch (error) {
        const result = errorResponse(error)
        res.status(result.status).send(result.response)
    }
}

module.exports = inboundController