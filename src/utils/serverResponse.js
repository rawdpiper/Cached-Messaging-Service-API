const serverResponse = (status, message, error) => {
    return {
        status,
        response: {
            message,
            error
        }
    }
}

module.exports = serverResponse