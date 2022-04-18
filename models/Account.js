const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = new Schema({
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    passwordConfirmed: {type: String, required: true},
    role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SUBSCRIBER"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('account', AccountSchema);