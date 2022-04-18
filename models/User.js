const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    account: {type: Schema.Types.ObjectId, required: true, ref:"Account"}
},
{timestamps: true}
);

module.exports = mongoose.model('user', UserSchema);