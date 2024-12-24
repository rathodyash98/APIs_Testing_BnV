const express = require('express')
const app = express()
// require('dotenv').config()
const PORT = process.env.PORT || 8080

const { errHandler } = require('./middleware/errHandler')
const orderRoutes = require('./routes/orderRoutes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api', orderRoutes)

app.use(errHandler);

app.use('*', (req, res) => {
    return res.status(404).send('ERROR 404 - Page Not Found')
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))