const Movie = require('../models/Movie');

exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies);
 } catch (error) {
     
 }
}

exports.createMovie = async (req, res, next) => {
        try {

            const newMovie = new Movie({...req.body});
            await newMovie.save();
            res.status(200).send(newMovie);
        } catch (error) {
            console.dir(error);
        }
}

exports.updateMovie = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const movieUpdated = await Movie.updateOne({ _id }, {
            $set: {
                ...req.body
            }
        })
        res.status(200).send(movieUpdated, {msg:'movie updated successefuly'});
        
    } catch (error) {
        console.dir(error);
    }
}


exports.deleteMovie = async (req, res, next) => {
    try {
        const { _id } = req.params;
        await Movie.deleteOne({ _id });
        res.status(200).send({msg:'movie deleted'})
        
         
    } catch (error) {
        
    }
}

exports.getOneMovie = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

