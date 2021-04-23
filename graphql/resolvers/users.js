const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('../../config');
const User = require('../../models/users');

module.exports = {
    Mutation : {
        async register(_,
            {
                registerInput:{username, password,confirmPassword, email}
            }
            ,
        context
        ,info)
        {   
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