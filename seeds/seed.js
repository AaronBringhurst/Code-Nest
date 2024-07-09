import sequelize from "../config/connection.js";
import seedUsers from "./seedUsers.js";
import seedPosts from "./seedPosts.js";

const seedAll = async () => {
  try {

      await seedUsers();
      await seedPosts();
      
  } catch (err) {
      console.error('Error during seeding:', err);
  }
};

seedAll();