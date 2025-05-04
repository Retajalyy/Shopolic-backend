const mongoose = require('mongoose')
const User = require('../Models/userModel'); 
const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1 
            }
        }
    ]
}, {
    timestamps: true 

});

module.exports = mongoose.model('cart', cartSchema);
