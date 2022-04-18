const express = require('express');
const router = express.Router();
const movieCtrl = require('../controllers/movie');

router.get('/', movieCtrl.getAllMovies);
router.post('/new', movieCtrl.createMovie);
router.put('/:_id', movieCtrl.updateMovie);
router.delete('/:_id', movieCtrl.deleteMovie);
router.get('/:_id', movieCtrl.getOneMovie);

module.exports = router;

