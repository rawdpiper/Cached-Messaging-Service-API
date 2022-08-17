const phoneNumber = require('../models/phoneNumber.model')

const getPhoneNuber = async (value) => {
    console.log(value)
    const number = await phoneNumber.findOne({
        where: { number: value }
    })
    return number
}

module.exports = getPhoneNuber