const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    try {
        await user.save();
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res
                .status(400)
                .json({ "message": "All fields required" });
        }
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            if (user) {
                const token = user.generateJwt();
                res
                    .status(200)
                    .json({ token });
            } else {
                res
                    .status(401)
                    .json(info);
            }
        })(req, res);
    } catch (error) {
        return res
            .status(500)
            , json({ "message": "Internal Server Error" });
    }
};
module.exports = {
    register,
    login
};