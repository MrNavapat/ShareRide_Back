const catchError = require("../utils/catch-error")
const createError = require("../utils/create-error")
const jwtService = require('../services/jwt-service')
const userService=require('../services/user-service')

const Authenticate = catchError(async (req, res, next) => {
    const authorization = req.headers.authorization
    console.log("req body is here !!!!!!!!!!!!")
    console.log(req.body)


    if (!authorization || !authorization.startsWith('Bearer '))
        {createError('Invalid Authorization')}

    const token = authorization.split(' ')[1]
    const decodedPayload = jwtService.verify(token)
    console.log('**********within Authenticate *********')
    console.log(token)
    console.log(decodedPayload)
    const authUser = await userService.findUserbyId(decodedPayload.Id)
    delete authUser.password
    req.user = authUser
    next()
})


module.exports = Authenticate;
