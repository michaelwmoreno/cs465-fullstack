const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register the model 
const Model = mongoose.model('trips');

//Get is going to list all the trips.
//Outcome must always include HTML status code
//and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //Unfiltered
        .exec();

        //Testing
        //console.log(q);

    if (!q)
    {
        //Database returned no data
        return res
            .status(404)
            .json(err);
    } else { //Return the trip list
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode}) //Unfiltered
        .exec();

        //Testing
        //console.log(q);

    if (!q)
    {
        //Database returned no data
        return res
            .status(404)
            .json(err);
    } else { //Return the trip list
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};