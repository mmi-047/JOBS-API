const User = require('../models/User')
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    // chech header
    console.log("coming hrere")
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({msg:'Authentication invalid'}, 401)
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload ,"payloadpayloadpayload")
        // const user = User.findById(payload.id).select('-password')
        // req.user = user
        req.user = { userID: payload.userID, name: payload.name }
        next()
    } catch (error) {
        return res.json({msg:'Authentication invalid'}, 401)
    }
}

module.exports = auth