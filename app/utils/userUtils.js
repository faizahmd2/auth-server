const User = require('../models/user');

var userUtil = {
    getUser: (cond) => User.findOne(cond),
    createUser: (user) => {
        const newUser = new User(user);
        return newUser.save()
    }
}

module.exports = userUtil;