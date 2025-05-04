const express= require('express');
require('dotenv').config();

const connectDB = require('./Utilities/dbConfig');
const port = 3000;

const app = express();
const path = require('path');  
const productRouter = require('./Routers/productRouter');
const userTypeRouter = require('./Routers/userTypeRouter');
const userRouter = require('./Routers/userRouter');
const categoryRouter = require('./Routers/categoryRouter');
const cartRouter = require('./Routers/cartRouter');
const orderRouter = require('./Routers/orderRouter');
const wishlistRouter = require('./Routers/wishlistRouter');
const cors = require('cors');
app.use(cors({
    origin:'http://localhost:4200' }));
connectDB();
app.use(express.json());
app.use('/product',productRouter);
app.use('/userType',userTypeRouter);
app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/wishlist',wishlistRouter);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(port, ()=> console.log(`server started at port: ${port}`)); 