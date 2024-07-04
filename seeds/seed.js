import sequelize from "../config/connection.js";
import seedUsers from "./seedUsers.js";
import seedPosts from "./seedPosts.js";

import User from "../models/user.js";

const seedAll = async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection to the Database successful');

      await sequelize.sync({ force: true });
      console.log('Database synchronized');

      await seedUsers();
      await seedPosts();

  } catch (err) {
      console.error('Error during seeding:', err);
  }
};

seedAll();