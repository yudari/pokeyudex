// ListPokemonPage.tsx
import React, { useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonDetail from './PokemonDetail'; // Ensure this import is correct
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchMyPokemonList } from '../redux/pokemonSlice';

const ListPokemonPage: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const { token } = useSelector((state: RootState) => state.pokemon);
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchMyPokemonList(token ?? ''));
    }, [dispatch])

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
                <PokemonList />
            </div>
            <div className="w-full md:w-1/3">
                <PokemonDetail />
            </div>
        </div>
    );
};

export default ListPokemonPage;
