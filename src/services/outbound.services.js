const Redis = require("ioredis")
const serverResponse = require("../utils/serverResponse")
const getPhoneNumber = require("./getPhoneNumber")

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)

const outboundService = async (value) => {
    const searchResult = getPhoneNumber(value.from)

    if(searchResult) {
        const result = await redis.get(value.from)
        
        if (result == value.to) {
            const res = serverResponse(400, "", `sms from ${value.from} to ${value.to} blocked by STOP request`)
            return res
        }
        else {
            const requestCount = await redis.get(value.from)

            if (requestCount > 50) {
                const res = serverResponse(400, "", `limit reached for from ${value.from}`)
                return res
            }
            else if (!requestCount) {
                await redis.incr(value.from)
                await redis.expire(value.from, 86400)

                const res = serverResponse(200, "outbound sms ok", "")
                return res
            }
            else {
                await redis.incr(value.from)

                const res = serverResponse(200, "outbound sms ok", "")
                return res
            }
        }
    }
    else{
        const res = serverResponse(400, "", "from parameter not found")
        return res
    }
}

module.exports = outboundService