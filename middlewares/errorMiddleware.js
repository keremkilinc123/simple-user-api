function errorMiddleware(err, req, res, next) {

    console.error(err);

    res.status(err.statusCode || 500).json({

        success: false,

        status: err.status || "error",

        message: err.message || "Sunucu hatası."

    });

}

module.exports = errorMiddleware;