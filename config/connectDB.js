const mongoose = require('mongoose');
require('dotenv').config({path:'config/.env'});

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('database connected...');
    } catch (error) {
        console.log({ error });
    }
}

module.exports = connectDB;

