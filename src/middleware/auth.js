const jwt = require("jsonwebtoken");
require("dotenv").config();

// This function checks if the user is authenticated before directing them to protected routes.
const requireAuth = (req, res, next) => {
    const token = req.cookie.jwt;
    //  check if json web token exists & is verified:
    if (token) {
        // The third parameter is a callback function that is called after verification is done
        // Its params: err-> if there is any, decodedToken-> if it is correct and got decodded
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        // User is not logged in, direct to login page
        res.redirect("/login");
    }

    next();
};

module.exports = { requireAuth };