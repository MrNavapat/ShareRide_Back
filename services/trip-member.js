const prisma = require('../models/prisma')

   
exports.createTripMember = data => prisma.tripMember.create({ data })


exports.quitTripMember = (tripId, tripMemberId ) => prisma.tripMember.deleteMany({
    where: {
        tripId: tripId,
        tripMemberId: tripMemberId
    }
})
    

