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


})


exports.getTripByGuest = catchError(async (req, res, next) => { 

    console.log(req.user)
    const tripResult =await tripService.getTripbyGuest()
    res.status(200).json({ tripResult });
    
        
})
    


exports.getTripByTripId = catchError(async (req, res, next) => { 


    console.log("**************get TripInfo by tripID***************")
    console.log(req.params.tripId)
    const TripResultbyTripId = await tripService.getTripbyTripId(+req.params.tripId)       
    res.status(200).json({TripResultbyTripId});
    
    
})
    


exports.UpdateTripInfoByTripId = catchError(async (req, res, next) => {
    console.log("**************UpdateTripInfo by trip Id***************")
    console.log(req.params.tripIdX)
    const UpdateTripInfoResult=await tripService.UpdateTripInfoByTripId(+req.params.tripIdX,req.body)
    res.status(200).json({UpdateTripInfoResult});


})