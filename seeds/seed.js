const sequelize = require('../config/connection');
const seedUsers = require('./users');
const seedPosts = require('./posts');

const seedAll = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection to the Database workie gud');
    
        await sequelize.sync({ force: true });
        console.log('Database synchronized with Dark Magic');

        await seedUsers ();
        await seedPosts ();

    } catch (err){
    console.log('Somthing no workie, i no like, check stuff and god speed hombre:', err);
  }
}

seedAll();