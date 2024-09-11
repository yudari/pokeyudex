const express = require('express');
const { addPokemonToUser, getUserPokemon, deletePokemon } = require('../models/PokemonModel');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.get('/my-pokemon', verifyToken, async (req, res) => {
    const pokemon = await getUserPokemon(req.user.id);
    res.json(pokemon);
});

router.post('/add-pokemon', verifyToken, async (req, res) => {
    await addPokemonToUser(req.user.id, req.body);
    res.json({ message: 'Pokemon added!' });
});

router.delete('/release-pokemon', verifyToken, async (req, res) => {
    await deletePokemon(req.user.id, req.body.name);
    res.json({ message: 'Pokemon released!' });
});

module.exports = router;
