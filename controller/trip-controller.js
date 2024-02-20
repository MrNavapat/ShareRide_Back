const fs=require('fs/promises');
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const cloudinaryService = require('../services/cloudinary-service')
const tripService=require('../services/trip-service')


exports.createTrip = catchError(async (req, res, next) => { 

    if(!req.files){createError('no Trip picture is included')}

    const data = {}

    if (req.files.tripPicture) {
        data.tripPicture = await cloudinaryService.upload(req.files.tripPicture[0].path)
        fs.unlink(req.files.tripPicture[0].path)
    }

    delete req.body.tripPicture    
    req.body.tripMember = +req.body.tripMember
    req.body.requestorId = +req.body.requestorId
    req.body.tripPicture = data.tripPicture
    
    console.log(req.body)
    const createTripResult=await tripService.createTrip(req.body)
await tripService.createTripMember({tripId:createTripResult.id,tripMemberId:req.body.requestorId,tripPosition:"TRIPLEADER",tripConfirmation:"CONFIRMED",tripReview:0 })

res.status(200).json({message:"upload done"})
    
})


exports.getTripById = catchError(async (req, res, next) => { 

console.log(req.user)
    const confirmTripResult = await tripService.getConfirmTripbyId(req.user.id)
    const pendingTripResult = await tripService.getPendingTripbyId(req.user.id)
    const upComingTripResult = await tripService.getUpcomingTripbyId(req.user.id)
    const manageTripResult = await tripService.getManageTripbyId(req.user.id)
    
res.status(200).json({confirmTripResult  ,pendingTripResult,upComingTripResult,manageTripResult});

    // res.status(200).json({manageTripResult});

})


exports.getTripByGuest = catchError(async (req, res, next) => { 

    console.log(req.user)
    const tripResult =await tripService.getTripbyGuest()
    res.status(200).json({ tripResult });
    
        
    })
