const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // call next middleware (errorHandler)
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // The following codes are replaced by middleware - checkObjectId
    // // check for Mongoose bad ObjectId
    // if (err.name === "CastError" && err.kind === 'ObjectId') {
    //     statusCode = 404;
    //     message = "Resource Not Found";
    // }

    // reorganize res.statusCode and json body
    res.status(statusCode).json({
        message,
        // avoid disclosure of sensitive information about the server during production stage
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export { notFound, errorHandler }; 