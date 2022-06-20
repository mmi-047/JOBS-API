const User = require('../models/User')
// const bcrypt =require("bcryptjs")
// const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // const{name,email,password}=req.body  
    // if(!name||!email||!password){        For Error msg
    //     return res.status(400).send({msg:'Please provide name,email and password'})
    // }
    // const{name,email,password}=req.body 
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password,salt) 
    // const tempUser = {
    //     name,
    //     email,
    //     password:hashedPassword
    // }
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    // const token = jwt.sign({userID:user._id,name:user.name},'jwtSecret',{expiresIn:'30d'})
    res.json({ user: { name: user.name }, token },201)
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) {
        return res.json({ msg: 'please provide email and password' }, 400)
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ msg: 'Invalid Credentials' }, 401)
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.json({ msg: 'Invalid Credentials' }, 401)
    }
    const token = user.createJWT()
    res.json({ user: { name: user.name }, token }, 200)

}

module.exports = {
    register,
    login,
}