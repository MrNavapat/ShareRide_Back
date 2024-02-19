const prisma = require('../models/prisma')

   
exports.createTripMember = data => prisma.tripMember.create({ data })


