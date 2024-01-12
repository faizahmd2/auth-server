const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtToken = require('../middleware/generateJWT')
let errorMessage = 'Something Went Wrong !!!'

var controller = {
    register: async function(req, res) {
        try {

            const { email, username, password } = req.body;
            if(!email || !username || !password) throw { errMessage: "Missing Parameters!!" }
            
            const userExist = await User.findOne({email, status: 1})
            
            if(userExist) throw { errMessage: "User already Registered" }

            const passwordHash = bcrypt.hashSync(password, 5);

            const newUser = new User({ username,  email, password: passwordHash, created: Date.now(), status: 1});
            let save = await newUser.save()
            return res.json({message: 'User Registered'});
        } catch (error) {
            console.error(error);
            if(error.errMessage) errorMessage = error.errMessage
            return res.json({ status: 0, message: errorMessage });
        }
    },
    login: async function(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password) throw { errMessage: "Missing Parameters!!" }

            let user = await User.findOne({email, status: 1})
            
            if(!user) throw { errMessage: "User not registered" }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) throw { errMessage: "Invalid Password" };
            // generate token and send to user

            let { error, token } = await jwtToken(user.email)
            if(error) throw { errMessage: "Error in login" }

            return res.json({status: 1, message: 'Logged In Successfully', token});
        } catch (error) {
            console.error(error);
            if(error.errMessage) errorMessage = error.errMessage
            return res.json({ status: 0, message: errorMessage });
        }
    }
}

module.exports = controller