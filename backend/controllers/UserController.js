const User = require('../models/User')
const bcrypt = require('bcrypt')

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
            res.status(500).json({ err })
    
        }
    },

    async delete (req, res) {
        const { id, password } = req.body

        try {

        const user = await User.findById(id)

        if(!user) return res.status(404).json({ message: "Id is not valid!" })

        const comparePasswors = bcrypt.compare(password, user.password)

        if(!comparePasswors) return res.status(404).json({ message: "the passwords do not match!" })

        const UserToBeRemoved = await User.findByIdAndRemove(id)

        return res.status(200).json({ message: user })

        } catch(err) {
            return res.status(500).json(err)
        }
    }
}