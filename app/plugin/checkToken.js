exports.checkToken = (portToken, sqlToken) => {
    if (portToken != sqlToken) {
        return {
            code: 1,
            message: 'token失效'
        }
    } else {
        return {
            code: 0
        }
    }
}