const createError = require('http-errors')

function notFoundHandler(req, res, next) {
    next(createError(404, "Your requested content not found"))
}

function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV.includes('development') ? err : { message: err.message }
    res.status(err.status || 500)
    if (!res.locals.html) {
        res.render('error', {
            title:"Error Page"
        })
    } else {
        res.json(res.locals.error)
    }
}

module.exports = {
    notFoundHandler,
    errorHandler
}