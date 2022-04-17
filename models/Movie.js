const mongoose = require('mongoose');

const { Schema } = mongoose;
const MovieSchema = new Schema({
    title: { type: String, required: true, unique: true },
    director: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
    trailer: { type: String},
    genre: { type: String, required: true  },
    isSeries: { type: Boolean, default:false  },
    year: {type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('movie', MovieSchema);


