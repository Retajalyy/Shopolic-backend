const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
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
       ],
       totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    deliveryStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('order', orderSchema);
