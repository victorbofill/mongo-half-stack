module.exports = (req, res) => {
    res.statusCode = 404;
    res.end({
        error: true,
        message: `Apologies. We could not ${req.method} ${req.url}`
    });
};