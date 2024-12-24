const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    console.log(err)

    res.status(statusCode)

    return res.json({
        success: false,
        message: err.message,
        stack : process.env.NODE_ENV === 'development' ? err.stack : null,
    })
}

module.exports = { errHandler }