const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connection')

const app = express()

connectDB()
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