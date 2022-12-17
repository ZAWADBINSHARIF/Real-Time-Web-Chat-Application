// get login page
function getLogin(req, res, nex) {
    res.render('login');
}

module.exports = { getLogin };