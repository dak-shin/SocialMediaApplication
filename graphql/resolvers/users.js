const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateUserData, validateUserLogin} = require('../../util/validate');
const {SECRET_KEY} = require('../../config');
const User = require('../../models/users');

const TokenGenerator = (user) => {
    return (
        jwt.sign({
                id: user.id,
                email:  user.email,
                username:   user.username,
            }, SECRET_KEY, {expiresIn : '2h'} )
    )
};

module.exports = {
    Mutation : {
        async login(_,{username, password}){

            const {valid, errors } = validateUserLogin(username, password);

            if(!valid){
                throw new UserInputError('Invalid credentials',{errors});
            }

            const user = await User.findOne({username});
            if(!user){
                errors.general = "User not found"
                throw new UserInputError("User not found",{ errors })
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = "Invalid username or password ";
                throw new UserInputError("Invalid username or password",{errors});
            }
            // console.log(user)
            const token = TokenGenerator(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },

        async register(_,
            {
                registerInput:{username, password,confirmPassword, email}
            }
        ,context
        ,info)
        {   
            const dup_user = await User.findOne({username});

            const {valid, errors} = validateUserData(username, email, password, confirmPassword);

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            if(dup_user)
            {
                throw new UserInputError('This username is already taken',{
                    errors:{
                        username:"This username is already taken, Please use a different one!!"
                    }
                })
            }



            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                email,
                timeAt:new Date().toISOString()
            })

            const res = await newUser.save();

            const token = TokenGenerator(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };

        }
    }
}