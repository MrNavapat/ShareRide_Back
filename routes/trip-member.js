const express=require('express')
const router = express.Router()
const tripMemberController=require('../controller/tripmember-controller')

const Authenticate = require('../middlewares/authenticate')



router.post('/', Authenticate,tripMemberController.createTripMember)
router.delete('/:tripId',Authenticate,tripMemberController.quitTripMember);


module.exports = router;