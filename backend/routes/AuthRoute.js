const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middlewares/fetchuser')
const router = express.Router()

const JWT_SECRET = "Godzilla@8126"

// create a new user account
router.post('/createuser', [
    body('name', 'name too short').isLength({ min: 2 }),
    body('email', 'enter a valid email address').isEmail(),
    body('password', 'password too short').isLength({ min: 2 }),
], async (req, res) => {
    const result = validationResult(req) // will retrieve the errors if any
    if (!result.isEmpty()) { // if errors found   
        res.status(400).json({ errors: result.array() }) // catching errors
    }
    try { // if errors not found or result.isEmpty() == true
        let user = await User.findOne({ email: req.body.email }) // returns true if a user is found with same email
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" })
        }
        
        const curPassword = req.body.password // password which was set in req.body
        const salt = bcrypt.genSaltSync(10) // will create a salt🧂 to be added to our password for added security
        const seqPassword = await bcrypt.hash(curPassword, salt) // hashed form of our password combined with salt

        user = await User.create({ // if no user found with same email then create one and add it to db
            name: req.body.name,
            email: req.body.email,
            password: seqPassword,
        })
 
        //JWT is an open standard (RFC 7519) that defines a way for verifying a user
        const data = { // its a payload which we want to include in our web token
            userId: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET) // jwt.sign() method is used to generate a JSON Web Token based on the provided data and a JWT_SECRET

        res.json({authToken})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("some internal server error occurred")
    }
})

// authenticate the user
router.post('/verify', [
    body('email', 'enter a valid email address').isEmail(),
    body('password', 'please enter a valid password').exists().isLength({min: 2})
], async (req, res) => {
    const result = validationResult(req)
    if(!result.isEmpty()) {
        return res.send({errors: result.array()})
    }
    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({error: "user doesnt exists"})
        }
        
        const checkPassword = await bcrypt.compare(password, user.password) // bcrypt.compare() method will compare the hashes of both passwords
        if(!checkPassword) {
            return res.status(400).json({error: "password doesnt match"})
        }

        const data = {
            userId: user.id
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        res.json({authToken})
    } catch(err) {
        console.error(err.message)
        res.status(500).send("some internal server error occurred")
    }
})

// get user details from auth token
router.post('/getUser', fetchUser, async(req, res)=> {
    try {
        const userId = req.user
        const user = await User.findById(userId).select("-password") // findById() method will fetch the user by id and select() method hides the password field
        res.send(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send("some internal server error occurred")
    }
})
module.exports = router