import User from '../models/user.js';

var userUtil = {
    getUser: (cond) => User.findOne(cond),
    createUser: (user) => {
        const newUser = new User(user);
        return newUser.save()
    }
}

export default userUtil;