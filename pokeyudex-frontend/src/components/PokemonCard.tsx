import React from 'react';
import { useGetPokemonByNameQuery } from '../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPokemon } from '../redux/pokemonSlice';
import { AppDispatch, RootState } from '../redux/store';

interface PokemonCardProps {
    name: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
    const { data, error, isLoading } = useGetPokemonByNameQuery(name);
    const dispatch = useDispatch<AppDispatch>();
    const myPokemonList = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const { isAuthenticated } = useSelector((state: RootState) => state.pokemon.myPokemonList);

    const isCaught = myPokemonList.myPokemonList.some(pokemon => pokemon.name === name); // Check if caught
    const myCatchPokemon = myPokemonList.myPokemonList.filter((pokemon) => pokemon.name === name);

    if (isLoading) return <div className="animate-pulse bg-gray-800 rounded-lg h-48"></div>;
    if (error) return <div className="text-red-500">Error loading {name}</div>;

    return (
        <div
            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-700 hover:border-blue-500"
            onClick={() => data && dispatch(setSelectedPokemon(data))}
        >
            <img src={data?.sprites.front_default} alt={name} className="w-32 h-32 mx-auto" />
            <h2 className="text-xl font-bold text-center mt-2 capitalize text-white">{name}</h2>

            {isCaught ? (
                <p className="text-green-500 text-center font-bold mt-2">Tertangkap!</p> // Show if caught
            ) : (
                isAuthenticated && (
                    <></>

                )
            )}
        </div>
    );
};

export default PokemonCard;
