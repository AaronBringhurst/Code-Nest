# Code Nest

## Description
Code Nest is a dynamic web application designed to foster a community of developers and tech enthusiasts. It provides a platform for users to share, discuss, and collaborate on crypto-related topics. With features like user authentication, post creation, and commenting, Code Nest aims to be a hub for knowledge sharing in the tech world.

## Table of Contents
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
To get started with Code Nest, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-github-username/code-nest.git
   cd code-nest
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   DB_NAME='your_database_name'
   DB_USER='your_database_username'
   DB_PASSWORD='your_database_password'
   DB_HOST='localhost'
   SESSION_SECRET='your_session_secret'
   ```

4. Set up the database:
   ```
   npm run db:create
   npm run db:migrate
   npm run db:seed
   ```

5. Start the application:
   ```
   npm start
   ```

## Screenshots

![Homepage](/public/images/homepage.png "Code Nest Homepage")

![Dashboard](/public/images/dashboard.png "User Dashboard")

![Create Listing](/public/images/Create_Listing.png "Create a New Post")

![Mobile View](/public/images/mobileView.png "Mobile Responsive Design")

## Usage

After installation, navigate to `http://localhost:3001` in your web browser. Here's how to use Code Nest:

1. Sign Up/Login: Create an account or log in to access all features.
2. Browse Posts: Explore posts from other users on the homepage.
3. Create Posts: Share your knowledge by creating new posts.
4. Comment: Engage in discussions by commenting on posts.
5. Dashboard: Manage your posts and view your activity.

## Technologies

Code Nest is built with the following technologies:

- **[Node.js](https://nodejs.org/)**: Runtime environment
- **[Express.js](https://expressjs.com/)**: Web application framework
- **[Sequelize](https://sequelize.org/)**: ORM for database management
- **[PostgreSQL](https://www.postgresql.org/)**: Database system
- **[Handlebars.js](https://handlebarsjs.com/)**: Templating engine
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Password hashing
- **[express-session](https://www.npmjs.com/package/express-session)**: Session management
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributing
Contributions to Code Nest are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Questions
If you have any questions about the project, feel free to reach out:

- GitHub: [Aaron Bringhurst](https://github.com/AaronBringhurst)
- Email: bringhurst.aaron@gmail.com

