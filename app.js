const express = require('express')
const app = express();
const { start, end } = require('./db/connection')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes Settings 
const userRoute = require('./routes/user')

const port = process.env.port || 3000


app.use('/users', userRoute);


app.post('/login', userRoute)

app.listen(port, (err) => {
    if (!err) {
        console.log('Connected Successfully on port ' + port)
    }
})