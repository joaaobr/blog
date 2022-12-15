require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET } = process.env

module.exports = {
    async authenticate(req, res) {
        const { email, password } = req.body

        if(!email) return res.status(404).json({ message: "email is not valid!" })
        if(!password) return res.status(404).json({ message: "password is not valid!" })

        try {
            const verifyEmail = await User.findOne({ email })
    
            if(!verifyEmail) return res.status(404).json({ message: "email is not valid!" })

            const verifyPassword = bcrypt.compare(password, verifyEmail.password)

            if(!verifyPassword) return res.status(404).json({ message: "password is not valid!" })

            const token = jwt.sign({ id: verifyEmail._id }, SECRET, { expiresIn: "1382400s", })

            return res.status(200).json({ message: token })
        } catch(err) {
            return res.status(500).json({ err })
        }

    },

    async validate(req, res) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ message: "token is not valid!" });

        try {
            jwt.verify(token, SECRET, (err, data) => {
                console.log(err, data)
                if(err) return res.status(404).json({ message: "token is not valid!" })

                if(data) return res.status(200).json({ message: "ok" }) 
            });
        } catch (err) {
            res.status(400).json({ err });
        }
    }
}