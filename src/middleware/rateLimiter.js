import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
    max: process.env.RATE_LIMIT,
    message: {
        error: 'Too many requests from this IP, please try again later.'
    } 
});

export default limiter;