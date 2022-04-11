class HttpException extends Error {
    constructor(msg = "服务器异常",errorCode = 10000,status = 500){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = status
    }
}

class ParameterException extends HttpException {
    constructor(msg = "参数错误",errorCode = 10000){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = 400
    }
}

module.exports = {
    HttpException,
    ParameterException
}