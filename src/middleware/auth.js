const Account = require('../models/account.model')

const auth = async (req, res, next) => {
    try{
        const base64cred = req.headers.authorization.split(' ')[1]
        const cred = Buffer.from(base64cred, 'base64').toString('ascii')
        const [username, password] = cred.split(':')
        const user = await Account.findOne({ where: {username: username} })
    
        if(user.auth_id != password){
            return res.status(403).send({ 
                message: "Invalid Authorization"
            })
        }
        req.user = user
        next()
    }catch(e){
        console.log(e)
        return res.status(403).send({ 
            message: "Invalid Authorization"
        })
    }
    
}

module.exports = auth