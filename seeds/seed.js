import sequelize from "../config/connection.js";
import seedUsers from "./seedUsers.js";
import seedPosts from "./seedPosts.js";

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });  // Sync models with the database, recreating tables
        await seedPosts();
        await seedUsers();
        console.log('Seeding completed successfully');
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await sequelize.close();  // Don't forget to close the connection
    }
};

seedAll();