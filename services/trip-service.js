const prisma = require("../models/prisma");

exports.createTrip = (data) => prisma.trip.create({ data });

exports.createTripMember = (data) => prisma.tripMember.create({ data });


exports.getConfirmTripbyId = (userId) =>
    prisma.trip.findMany({
        where: {
            AND: [{ tripStatus: 'CONFIRM' },{requestorId:userId},
            { tripmember: { some: { tripConfirmation: 'CONFIRMED' } } }
            ]
        },
        include: {
            tripmember: {
                where:{tripConfirmation:'CONFIRMED'}
            }

        }
    })
      
exports.getPendingTripbyId = (userId) =>
prisma.trip.findMany({
    where: {
        AND: [{ tripStatus: 'INITIATE' },
            { tripmember: { some: { tripConfirmation: 'PENDING' } } },
            { tripmember: { some: { tripMemberId:userId}}}
        ]
    },
    include: {
        tripmember: {
            where:{tripConfirmation:'PENDING'}
        }

    }
})  


exports.getUpcomingTripbyId = (userId) =>
    prisma.trip.findMany({
        where: {
            AND: [{ tripStatus: 'INITIATE' },
            { tripmember: { none: { tripMemberId: userId } } }
            ]
        },
        include: {
            tripmember: true
                
            }

        
    })


exports.getManageTripbyId = (userId) => prisma.trip.findMany({where: {tripStatus: "INITIATE", requestorId: userId }})



exports.getTripbyGuest = () =>prisma.trip.findMany({ where:{ tripStatus: "INITIATE" } } );
  


exports.getTripbyTripId = (tripId) =>prisma.trip.findUnique({ where:{ id: tripId } } );

