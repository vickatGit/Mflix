const ErrorHandler= (error,req,res,next) => {
    console.log(error)
    const resCode=res.statusCode || 500
    switch(resCode){
        case 400 :{
            res.json({
                code:resCode,
                message:error.message
            })
        }
        case 422 :{
            res.json({
                code:422,
                errors:error
            })
        }
        case 500 : {
            res.json({
                code:resCode,
                message:"Internal Server Error"
            })
        }
    }
    next()
}

module.exports = ErrorHandler