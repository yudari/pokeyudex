import React, { useState } from 'react';
import { useGetPokemonListQuery } from '../redux/apiSlice';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PokemonList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 8;
    const offset = (page - 1) * limit;

    const { data, error, isLoading } = useGetPokemonListQuery({ limit, offset });
    const { isAuthenticated } = useSelector((state: RootState) => state.pokemon.myPokemonList);



    if (isLoading) return <div className="text-white text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {(error as Error).message}</div>;

    const filteredPokemon = data?.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil((data?.count || 0) / limit);

    return (
        <div>
            <SearchBar onSearch={setSearchQuery} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemon?.map((pokemon: any) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default PokemonList;
