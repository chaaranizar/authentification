const jwt = require('jsonwebtoken');
const User = require("../models/User");


const isAuth = async (req, res, next) => {
    try {
        // token = headers
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send ({errors:[{msg:"Not Authorized!!"}]});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne ({_id: decoded.id});
        if (!foundUser) {
            return res.status(401).send ({errors:[{msg:"Not Authorized!!"}]});
        }
        req.user = foundUser;
        next();
    } catch(error) {
        res.status(401).send ({errors:[{msg:"Not Authorized!!"}]});
    }
};

module.exports = isAuth;