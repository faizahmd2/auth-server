import { hashSync, compareSync } from 'bcrypt';
import passport from 'passport';
import jwtToken from '../middleware/generateJWT.js';
import { LOGIN_PASSWROD_SALT_ROUND, serverError, provider_login } from '../utils/constants.js';
import userUtil from '../utils/userUtils.js';
import logger from '../utils/logger.js';

var controller = {
    register: async function(req, res) {
        try {

            const { email, username, password } = req.body;
            if(!email || !username || !password) return res.json({ status: 0, message: "Missing Parameters!!" });
            
            const userExist = await userUtil.getUser({email});
            
            if(userExist) return res.json({ status: 0, message: "User already Registered" });

            const passwordHash = hashSync(password, LOGIN_PASSWROD_SALT_ROUND);

            let newUser = {
                username,  
                email, 
                password: passwordHash, 
                type: 1, 
                role: 'normal', 
                created: Date.now(), 
                status: 1
            };

            await userUtil.createUser(newUser)

            return res.json({message: 'User Registered'});
        } catch (error) {
            logger.error("CATCHED error register user",error);
            return res.status(500).json({ error: serverError });
        }
    },
    login: async function(req, res) {
        try {
            const { email, password } = req.body;
            if(!email || !password) return res.json({status: 0, message: 'Parameters Missing email and password required'});

            let user = await userUtil.getUser({email})
            
            if(!user) return res.json({status: 0, message: 'User not registered'});

            let comparePassword = compareSync(password, user.password);
            if (!comparePassword) return res.json({status: 0, message: 'Invalid Password'});
            // generate token and send to user

            let { error, token } = await jwtToken({email: user.email})
            if(error) throw {error: error};

            res.cookie('token', token, { maxAge: 3600000, httpOnly: true });

            return res.json({status: 1, message: 'Logged In Successfully', token});
        } catch (error) {
            logger.error("CATCHED error login user",error);
            return res.status(500).json({ error: serverError });
        }
    },
    loginUserWithProvider: async function(req, res, next) {
        try {
            const provider = req.params.provider;

            const allowedProviderLogin = provider_login ? provider_login : [];
            if (!allowedProviderLogin.includes(provider)) {
              return res.json({ status: 0, message: "Invalid Provider Login Attempt" });
            }
        
            passport.authenticate(provider)(req, res, next);
        } catch (error) {
            logger.error("CATCHED error loginUserWithProvider",error);
            return res.status(500).json({ error: serverError });
        }
    },
    loginUserCallbackWithProvider: async function(req, res, next) {
        try {
            let provider = req.params.provider;
            console.log("HERE",provider)
            if(!provider) throw new Error("Unknown provider in loginUserCallbackWithProvider " + provider);
    
            passport.authenticate(provider, { failureRedirect: '/login', successRedirect: '/' }, async (err, user) => {
                try {
                    if (err) {
                        logger.error("loginUserCallbackWithProvider authenticate error",err);
                        throw new Error("Error authenticating passport for provider-"+provider);
                    }
    
                    if(!user) throw new Error("Provider Login Error, no user found");
        
                    // generate token and send to user
                    let { error, token } = await jwtToken({email: user.email, providerId: user.providerId})
                    if(error) throw new Error("Error generating user session in provider login")
        
                    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
        
                    // return res.json({status: 1, message: 'Logged In Successfully', token});
                    return res.redirect("/home");
                } catch (error) {
                    logger.error("CATCHE login callback: ",error);
                    return res.status(500).json({ status: 0, error: serverError });
                }
            })(req, res, next);
        } catch (error) {
            logger.error("catched error login callback",error);
            return res.status(500).json({ status: 0, error: serverError });
        }
    }
}

export default controller;