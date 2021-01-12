//--Libraries importing--
//require('dotenv').config();
const express = require('express');
const cors = require('cors')
const path = require('path');
const logger = require('morgan');
const session = require('client-sessions');
const corsConfig = {
  origin: true,
  credentials: true
};
//--DB config--
const DB = require('./modules/DB.js');

//--Routes importing--
const recipes = require('./routes/recipes');
const users = require('./routes/users');
const auth = require('./routes/auth');

//--App setting--
const app = express();
// parse application/x-www-form-urlencoded
app.use(express.json());
// parse application/json
app.use(express.urlencoded({ extended: false }));
//To serve static files such as images, CSS files, and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));
//print request logs
app.use(logger(':method :url :status :response-time ms'));
//--Allow CORS--
app.use(cors(corsConfig))
app.options("*", cors(corsConfig))

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

//cookie configuration
app.use(
  session({
    cookieName: 'session', // the cookie key name
    secret: 'blkdwjdwjdwjdkwjdkwd',
    duration: 360 * 60 * 1000, // expired after 20 sec
    activeDuration: 0, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false
    }
  })
);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

//--Routing--
app.use('/api/recipes', recipes);
app.use('/api/users', users);
app.use(auth);

//--Default route
app.use((req, res) => {
  res.sendStatus(404);
});
