const prisma = require('../models/prisma')

exports.createTrip = data => prisma.trip.create({ data })

   
exports.createTripMember = data => prisma.tripMember.create({ data })



exports.getConfirmTripbyId = userId => prisma.trip.findMany({ where: { AND:  [{ requestorId: userId }, { tripStatus: 'CONFIRM' } ]} })
exports.getPendingTripbyId = userId => prisma.trip.findMany({ where: { AND:  [{ requestorId: userId }, { tripStatus: 'INITIATE' } ]} })
   
    
exports.getTripbyGuest = () => prisma.trip.findMany({ where: {  NOT: { tripStatus: 'CANCEL' } } })
