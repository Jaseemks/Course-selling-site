const handleError = async(error,req,res,next)=>{
    try {
        const statusCode =error.statusCode || 500;
        const message = error.message || 'something went wrong'
        // res.status(statusCode).message({message});
        res.status(statusCode).json({ message });
        
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
    }
}

module.exports = {handleError}