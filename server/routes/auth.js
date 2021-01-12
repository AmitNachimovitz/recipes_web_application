const express = require('express');
const router = express.Router();
const DB = require('../modules/DB');
const dbUtils = require('../modules/dbUtils');
const bcrypt = require('bcrypt');
require('dotenv').config();

// METHOD: POST
// ROUTE: /Register
// DESC: Handle user registraion
router.post('/register', async (req, res, next) => {
    try {
      const users = await dbUtils.getUserNames();
  
      if (users.find((x) => x.username === req.body.username))
      res.status(409).send({ message: 'User name is already exists. Please choose a new one.'});
  
      // add the new username
      let hash_password = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.bcrypt_saltRounds)
      );
      await dbUtils.regiterNewUser(req.body.username, req.body.firstName, req.body.lastName, req.body.country, hash_password, req.body.email, req.body.imgURL);
      res.status(201).send({ message: 'user created', success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


// METHOD: POST
// ROUTE: /Login
// DESC: Handle user Login
router.post('/login', async (req, res, next) => {
    try {
      // check that username exists
      const users = await dbUtils.getUserNames();
      if (!users.find((x) => x.username === req.body.username))
        res.status(401).send({ message: 'Username or Password incorrect'});
  
      // check that the password is correct
      const user = (
        await dbUtils.getUserIdByUserName(`${req.body.username}`)
      )[0];
  
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send({ message: 'Username or Password incorrect'});
      }
  
      // Set cookie
      req.session.user_id = user.user_id;
      // return cookie
      res.status(200).send({ message: 'login succeeded', success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
    });


// METHOD: POST
// ROUTE: /Logout
// DESC: Handle user Logout
router.post('/logout', function(req, res) {
    req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
    res.send({ success: true, message: 'logout succeeded' });
  });


  module.exports = router;