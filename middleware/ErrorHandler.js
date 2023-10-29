const ErrorHandler = async(err,req,res,next) => {
    const resCode = res.statusCode  || 500
    switch(resCode){
        case 422 : {
            res.send({ errors: err })
        }
        case 500 : {
            res.send({ errors:["Internal Server Error"] })
        }
    }
    next()
}
module.exports = ErrorHandler