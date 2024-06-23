
const { User } = require ('../models');

const userData = [

];

const seedUsers = async () => {
    try{
        await User.bulkCreate(userData);
        console.log('User data seeded');
    } catch (err){
        console.log('User data not seeded!', err );
    }
}

module.exports = seedUsers;