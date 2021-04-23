const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateUserData, validateUserLogin} = require('../../util/validate');
const {SECRET_KEY} = require('../../config');
const User = require('../../models/users');

module.exports = {
    Mutation : {
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

            const token = jwt.sign({
                id:res.id,
                email:res.email,
                username:res.username,
            }, SECRET_KEY, {expiresIn : '1h'} );

            return {
                ...res._doc,
                id: res._id,
                token
            };

        }
    }
}