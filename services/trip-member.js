const prisma = require('../models/prisma')

   
exports.createTripMember = data => prisma.tripMember.create({ data })


exports.quitTripMember = (tripId, tripMemberId ) => prisma.tripMember.deleteMany({
    where: {
        tripId: tripId,
        tripMemberId: tripMemberId
    }
})


exports.getTripMemberbyTripId = (tripId) => prisma.tripMember.findMany({
    where: {
        tripId: tripId,
    },
    include: {
        user:true
    }
})