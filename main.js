const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connection')
const mongoose = require('mongoose')
const app = express()

// connectDB()

console.log('uri', process.env.mongodb_uri);

mongoose.connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected!');
})

const PORT = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hellooo');
})

app.use('/api/customers', require('./routes/customers-route'))
app.use('/api/type_transactions', require('./routes/type_transactions-route'))

app.listen(PORT, () => {
    console.log(`Server started in ${PORT}`)
})