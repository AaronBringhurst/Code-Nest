// ESM import syntax
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let sequelize;

// Checks to see if the application is deployed. If DB_URL environment variable exists, then that is used. If not, it determines that you're on your local machine and utilizes the environment variables from the .env file to set up Sequelize.
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    define: {
      freezeTableName: true
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );
}

// ESM export syntax
export default sequelize;
