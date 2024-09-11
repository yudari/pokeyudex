import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonDetails } from '../types/pokemon';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
            query: ({ limit = 20, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
        }),
        getPokemonByName: builder.query<PokemonDetails, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
});

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;