const Redis = require("ioredis")
const serverResponse = require("../utils/serverResponse")
const getPhoneNumber = require("./getPhoneNumber")

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)

const inboundService = async (value) => {
    const searchResult = await getPhoneNumber(value.to)
    
    if(searchResult) {
        if(['STOP', 'STOP\n', 'STOP\r', 'STOP\r\n'].includes(value.text)){
            redis.set(value.from, value.to, 'ex', 14400)
        }
        const res = serverResponse(200, "inbound sms ok", "")
        return res
    }else{
        const res = serverResponse(400, "", "to parameter not found")
        return res
    }
}

module.exports = inboundService