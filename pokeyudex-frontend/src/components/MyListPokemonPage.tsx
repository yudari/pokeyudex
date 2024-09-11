import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { releasePokemonFromBackend, fetchMyPokemonList } from '../redux/pokemonSlice';

const MyListPokemonPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { username, isAuthenticated, myPokemonList } = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const token = useSelector((state: RootState) => state.pokemon.token);

    useEffect(() => {
        // Fetch the Pokemon list when component mounts
        if (isAuthenticated && token) {
            dispatch(fetchMyPokemonList(token));
        }
    }, [isAuthenticated, token, dispatch]);

    const releasePokemon = async (pokeName: string) => {
        if (token) {
            try {
                await dispatch(releasePokemonFromBackend({ name: pokeName, token })).unwrap();
                // Fetch the updated list after successful release
                dispatch(fetchMyPokemonList(token));
            } catch (error) {
                console.error("Failed to release Pokémon:", error);
            }
        }
    };

    console.log("daftar pokemonku: ", myPokemonList);

    return (
        <div className='w-full max-h-screen bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 overflow-y-auto flex flex-row gap-4 '>
            {isAuthenticated ? (
                myPokemonList.length > 0 ? (
                    myPokemonList.map((pokemon: any, index) => (
                        pokemon.name ? (
                            <div key={index} className='my-item-pokemon w-48 h-48 bg-blue-600 rounded-md px-1 py-2 flex flex-col justify-between items-center'>
                                <h1 className='title-pokemon text-center'>{pokemon.nickname.toUpperCase()}</h1>
                                <img
                                    src={pokemon.sprite || 'default_image_url'}
                                    alt={pokemon.name}
                                    className="w-28 h-28 mx-auto"
                                />
                                <button
                                    onClick={() => releasePokemon(pokemon.name)}
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                >
                                    Release
                                </button>
                            </div>
                        ) : (
                            <div key={index} className='my-item-pokemon w-48 h-48 bg-gray-600 rounded-md px-1 py-2 flex flex-col justify-between items-center'>
                                <h1 className='title-pokemon text-center'>Unknown Pokémon</h1>
                            </div>
                        )
                    ))
                ) : (
                    <h1 className='title-pokemon text-center'>Tidak ada pokemon yang ditangkap</h1>
                )
            ) : (
                <h1 className='title-pokemon text-center'>Silakan login untuk melihat koleksi Pokemon Anda</h1>
            )}
        </div>
    );

};

export default MyListPokemonPage;
