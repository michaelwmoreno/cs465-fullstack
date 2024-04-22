const express = require('express'); //Express app
const router = express.Router(); //Router Logic
const { expressjwt: jwt} = require("express-jwt");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],  //algorithm needed for the JWT
});

//This is where we import the controlelrs we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router 
    .route('/trips')
    .get(tripsController.tripsList) //GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); //POST Methods Adds a trip


router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) //GET Method routes tripsFindbyCode.  
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;