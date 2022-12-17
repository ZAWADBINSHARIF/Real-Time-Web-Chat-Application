function decorateHtmlResponse(title_name, isHtml = true) {
    return function (_req, res, next) {
        res.locals.title = title_name +" - "+ process.env.APP_NAME
        res.locals.html = isHtml
        next()
    }
}

module.exports = decorateHtmlResponse;