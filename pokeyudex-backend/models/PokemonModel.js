const pool = require('../config/db');

const addPokemonToUser = async (userId, pokemon) => {
    const { name, nickname, sprite } = pokemon;
    const result = await pool.query(
        'INSERT INTO user_pokemon (user_id, name, nickname, sprite) VALUES ($1, $2, $3, $4)',
        [userId, name, nickname, sprite]
    );
    return result;
};

const getUserPokemon = async (userId) => {
    const result = await pool.query('SELECT * FROM user_pokemon WHERE user_id = $1', [userId]);
    return result.rows;
};

const deletePokemon = async (userId, pokemonName) => {
    const result = await pool.query('DELETE FROM user_pokemon WHERE user_id = $1 AND name = $2', [userId, pokemonName]);
    return result;
};

module.exports = { addPokemonToUser, getUserPokemon, deletePokemon };
