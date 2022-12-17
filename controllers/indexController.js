// get index page
function getIndex(req, res, next) {
    res.render('index')
}

module.exports = { getIndex }