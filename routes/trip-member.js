const express=require('express')
const router = express.Router()
const tripMemberController=require('../controller/tripmember-controller')

const Authenticate = require('../middlewares/authenticate')



router.post('/', Authenticate,tripMemberController.createTripMember)


module.exports = router;