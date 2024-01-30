'use server'

const date = new Date()

const getSales = async () => {
    const users = await prisma.client.findMany({})

    let sales = {
        day:0,
        month:0
    }

    users.forEach((user) => {   
        const userDate = new Date(user.created_at)
        if(userDate.getDay() === date.getDay())sales.day++;
        if(userDate.getMonth() === date.getMonth())sales.month++;
    })
   
    return sales
}

export {getSales}