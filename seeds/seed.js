import sequelize from "../config/connection.js";
import seedUsers from "./seedUsers.js";
import seedPosts from "./seedPosts.js";

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        await seedPosts();
        await seedUsers();
    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await sequelize.close();
    }
};

seedAll();