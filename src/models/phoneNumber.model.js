const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')


const phoneNumber = sequelize.define('phoneNumber',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: DataTypes.STRING(40)
    },
    account_id: {
        type: DataTypes.INTEGER
    }},{
    tableName: 'phone_number',
    timestamps: false
})

module.exports = phoneNumber