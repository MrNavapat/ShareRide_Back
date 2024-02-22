const catchError = require("../utils/catch-error");
const tripMemberService=require('../services/trip-member')

exports.createTripMember = catchError(async (req, res, next) => { 

   
await tripMemberService.createTripMember({tripId:req.body.tripId,tripMemberId:req.user.id,tripPosition:"TRIPMEMBER",tripConfirmation:"PENDING",tripReview:0 })

res.status(200).json({message:"join trip done"})
    
})

exports.quitTripMember=catchError(async(req,res,next)=>{
    console.log("**************QuitTripMember***************")
    console.log(req.params.tripId)

    await tripMemberService.quitTripMember( +req.params.tripId,req.user.id )

    res.status(200).json({message:"delete trip done"})
    
})

exports.getTripMemberbyTripId = catchError(async (req, res, next) => {
    console.log("**************get TripMember by TripId***************")
    console.log(req.params.tripId)
    const TripMemberResultbyTripId =await tripMemberService.getTripMemberbyTripId( +req.params.tripId)
    res.status(200).json({TripMemberResultbyTripId});


})


exports.updateTripMemberbyTripIdandMemberId = catchError(async (req, res, next) => {
    console.log("**************Update TripMember by TripId***************")
    console.log(req.params.tripId)
    const UpdateTripMemberResultbyTripIdandMemberId =await tripMemberService.updateTripMemberbyTripIdandMemberId( +req.params.tripId,+req.params.tripMemberId,req.body)
    res.status(200).json({UpdateTripMemberResultbyTripIdandMemberId});

})




