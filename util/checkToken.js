const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { AuthenticationError} = require('apollo-server');

const checkAuthToken = (context) => {

    //We pass the token provided in every request we send. Hence we make check token a function
    //The token will be present in the authorization header. 
    //The request message is passed as the context to be able to access the token. 

    const authHeader = context.req.headers.authorization;

    if(authHeader)
    {
        const Token = authHeader.split('Bearer ')[1];
        if(Token)
        {
            try{
                const user = jwt.verify(Token, SECRET_KEY);
                return user;
            }
            catch(error){
                throw new AuthenticationError('Invalid or expired token');
            }
        }
        throw new Error('Invalid Token, it must be Bearer [Token]');
    }
    throw new Error('Authentication token must be provided');

};

module.exports = {checkAuthToken};