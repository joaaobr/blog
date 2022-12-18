require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    async create (req, res) {
        const { name, email, password } = req.body

        if(!name) return res.status(404).json({ message: "name is not valid!" })
        if(!email) return res.status(404).json({ message: "email is not valid!" })
        if(!password) return res.status(404).json({ message: "password is not valid!" })

        try {
            const checkEmailExists = await User.findOne({ email })

            if(checkEmailExists) return res.status(404).json({ message: "this email already exists!" })
            
            const passwordGenSalt = await bcrypt.genSalt(12);

            const hashPassword = await bcrypt.hash(password, passwordGenSalt);

            const user = await User.create({ 
                name, 
                email, 
                password: hashPassword 
            })   

            return res.status(201).json({ message: user})
        } catch(err) {
            return res.status(500).json({ err })
        }
    },

    async delete (req, res) {
        const { id } = req.params
        const { password } = req.body

        try {

            const user = await User.findById(id)

            if(!user) return res.status(404).json({ message: "Id is not valid!" })

            const comparePasswors = bcrypt.compare(password, user.password)

            if(!comparePasswors) return res.status(404).json({ message: "the passwords do not match!" })

            const UserToBeRemoved = await User.findByIdAndRemove(id)

            return res.status(200).json({ message: UserToBeRemoved })

        } catch(err) {
            return res.status(500).json(err)
        }
    },

    async update (req, res) {
        const { id } = req.params
        const { password } = req.body

        try {

            const user = await User.findById(id)

            if(!user) return res.status(404).json({ message: "Id is not valid!" })

            const comparePasswors = bcrypt.compare(password, user.password)

            if(!comparePasswors) return res.status(404).json({ message: "the passwords do not match!" })

            const UserToBeUpdate = await User.findByIdAndUpdate(id, req.body, { now: true })

            return res.status(200).json({ message: UserToBeUpdate })

        } catch(err) {
            return res.status(500).json(err)
        }
    },

   async getUserByEmail(req, res) {
    const { token } = req.body

    jwt.verify(token, SECRET, async (err, data) => {
        if(err) return res.status(404).json({ message: "token is not valid!" })

        const id = data.id
        const checkIdExists = await User.findById(id)

        if(!checkIdExists) return res.status(404).json({ message: "id is not valid!" })

        return res.status(200).json({ message: checkIdExists.email })
    })



   }
}