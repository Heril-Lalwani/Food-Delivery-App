const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Food', FoodSchema);
