const jwt = require('jsonwebtoken')
const users = require('../models/users')

const auth = async (req, res, next) => {
    try {
        // const token = req.header("Authorization").replace("Bearer ", "");

        const token = req.cookies.jwt
        if (!token)
            //unauthorized
            return res.send(401).json({ error: "No token Provided, please join us" })

        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded) //unauthorized bardo
            return res.send(401).json({ error: "Invalid token, please login in again" })

        const user = await users.findById(decoded.userId)
        if (!user) 
			return res.status(404).json({ error: "User not found" });

        req.user = user
        req.token = token
        next()

    } catch (error) {
        console.error(error.message, 'hena fel auth')
        res.status(500).json({ error: "Interal Server Error" })
    }
}

module.exports = auth