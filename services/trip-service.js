const prisma = require('../models/prisma')

exports.createTrip = data => prisma.trip.create({ data })

exports.getTrip = userId => prisma.trip.findMany({ where: { AND:  [{ requestorId: userId }, { NOT: { tripStatus: 'CANCEL' } }]} })
    
    
