const express = require('express');
const connectDB = require('./config/connectDB');
const movieRouter = require('./routers/Movie');
const app = express();
const cors = require('cors');

const port = process.env.DEFAULT_PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/movies', movieRouter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.listen(port, (err) => {
    if (err) {
        console.log(`server is not running!`)
    } else {
        console.log(`server is running in port ${port}...`);
    }
});


