const express = require('express'); //Express app
const router = express.Router(); //Router Logic

//This is where we import the controlelrs we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router 
    .route('/trips')
    .get(tripsController.tripsList) //GET Method routes tripList
    .post(tripsController.tripsAddTrip); //POST Methods Adds a trip

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) //GET Method routes tripsFindbyCode.  
    .put(tripsController.tripsUpdateTrip);

module.exports = router;