const catchError = require("../utils/catch-error");
const tripMemberService=require('../services/trip-member')

exports.createTripMember = catchError(async (req, res, next) => { 

   
await tripMemberService.createTripMember({tripId:req.body.tripId,tripMemberId:req.user.id,tripPosition:"TRIPMEMBER",tripConfirmation:"PENDING",tripReview:0 })

res.status(200).json({message:"join trip done"})
    
})




