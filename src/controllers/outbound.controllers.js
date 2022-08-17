const reqSchema = require("../validators/validator")
const outboundService = require("../services/outbound.services")
const errorResponse = require("../utils/errorResponse")

const outboundController = async(req, res) => {
    try {
        const value = await reqSchema.validateAsync(req.body)
        const result = await outboundService(value)

        res.status(result.status).send(result.response)
    }
    catch(error) {
        const result = errorResponse(error)
        res.status(result.status).send(result.response)
    }
}

module.exports = outboundController