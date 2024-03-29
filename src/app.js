require('dotenv').config()
const express = require('express')
const cors = require('cors')
const error = require('../middlewares/error')
const notfound = require('../middlewares/not-found')
const AuthRoute = require('../routes/auth-route')
const TripRoute = require('../routes/trip-route')
const TripMemberRoute=require('../routes/trip-member')

const app = express()
app.use(cors())
app.use(express.json())




app.use('/auth', AuthRoute)
app.use('/trip', TripRoute);
app.use('/tripmember', TripMemberRoute);



app.use(notfound)
app.use(error)

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`server running on port:${PORT}`))