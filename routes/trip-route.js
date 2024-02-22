const express=require('express')
const router = express.Router()
const tripController = require('../controller/trip-controller')
const upload = require('../middlewares/upload')  
const Authenticate = require('../middlewares/authenticate')




router.post('/', Authenticate,upload.fields([{name:'tripPicture'}]),tripController.createTrip)
router.get('/profile', Authenticate, tripController.getTripById)
router.get('/all',tripController.getTripByGuest)
router.get('/:tripId', Authenticate, tripController.getTripByTripId)
router.patch('/:tripIdX',Authenticate,tripController.UpdateTripInfoByTripId)

module.exports = router;