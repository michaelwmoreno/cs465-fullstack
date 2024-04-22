const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register the model 
const Model = mongoose.model('trips');
const User = mongoose.model('users')

//Get is going to list all the trips.
//Outcome must always include HTML status code
//and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) //Unfiltered
        .exec();

    //Testing
    //console.log(q);

    if (!q) {
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

const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) //Unfiltered
        .exec();

    //Testing
    //console.log(q);

    if (!q) {
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

const tripsAddTrip = async (req, res) => {
    try {
        const user = await getUser(req, res);
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    try {
        const user = await getUser(req, res);
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }

        );
        if (!trip) {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getUser = (req, res, callback) => {
    return new Promise((resolve, reject) => {
        if (req.auth && req.auth.email) {
            User.findOne({ email: req.auth.email })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    } else {
                        resolve(user.name);
                    }
                })
                .catch(err => {
                    console.error(err);
                    reject({ status: 500, message: 'Internal Server Error' });
                });
        } else {
            reject({ status: 404, message: 'User not found' });
        }
    });
};



module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};