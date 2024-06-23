const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
helpers = require('./utils/helpers/funtime1');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

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
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

async function startServer (){
  try{
    app.listen(PORT, () =>{
      console.log(`Server is now listining on PORTSKI ${PORT}`)
    });
  } catch (err){
    console.log('Somthing no workie, i no like, check stuff and god speed hombre:', err);
  }
}

startServer();