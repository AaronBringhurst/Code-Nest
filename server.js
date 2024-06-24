// ESM import syntax
import path from 'path';
import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import routes from './controllers/index.js';
import helpers from './utils/helpers/funtime1.js';
import sequelize from './config/connection.js';
import connectSessionSequelize from 'connect-session-sequelize';

const SequelizeStore = connectSessionSequelize(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers // This will incorporate your custom helpers
});

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);  // Make sure to use 'hbs.engine' directly
app.set('view engine', 'handlebars');
app.set('views', path.join(path.resolve(), 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(routes);

const startServer = async () => {
  try {
    await new Promise((resolve, reject) => {
      const server = app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        resolve(server);
      }).on('error', (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

startServer();
