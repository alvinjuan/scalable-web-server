const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const status = err.statusCode || 500;
    const messsage = err.message || 'Internal server error';

    res.status(status).json({ 
        error: {
            message,
            status,
            timestamp: new Date().toISOString(),
        },
    });
};

export default errorHandler;