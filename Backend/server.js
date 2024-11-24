require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require("./routes/admin/products-routes")
const adminOrderRouter = require("./routes/admin/order-routes")
const shopProductsRouter = require('./routes/shop/products-route')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
const shopSearchRouter = require('./routes/shop/search-routes')
const shopReviewRouter = require('./routes/shop/review-routes')
const commonFeatureRouter = require("./routes/common/feature-routes")



const app = express();
const port = process.env.PORT || 9000;

//database connection 
mongoose.connect(process.env.MONGO_URI)
.then(
    () =>  console.log('connected to database'),
).catch((error) =>
    console.log("Database Error",error)
)

app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json());


app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)
app.use('/api/shop/review',shopReviewRouter)
app.use('/api/common/feature',commonFeatureRouter)



app.listen(port,() => {
    console.log(`Server is running on ${port}`)
})


