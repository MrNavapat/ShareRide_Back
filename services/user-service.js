const prisma = require('../models/prisma')

exports.findUserName = userName => 
    prisma.user.findFirst({
        where:  {userName:userName}
     
        
    })

    
exports.createUser = data => prisma.user.create({ data })

exports.findUserbyId=id=>prisma.user.findUnique({where:{id}})

exports.updateUserById = (data, id) => prisma.user.update({ data, where: { id } })

