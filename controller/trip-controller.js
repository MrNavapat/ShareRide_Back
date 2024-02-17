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
    await tripService.createTrip(req.body)
       

res.status(200).json({message:"upload done"})
    
})


exports.getTrip = catchError(async (req, res, next) => { 

console.log(req.user)
const tripResult =await tripService.getTrip(req.user.id)
res.status(200).json({ tripResult });

    
})
