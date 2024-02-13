const createError = (message, statusCode) => {
    

    const error = new Error(message)
    error.statuscode = statusCode
    throw error
}

module.exports = createError
