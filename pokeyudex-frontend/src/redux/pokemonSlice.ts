import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonDetails, UserLogin } from '../types/pokemon';
import axios from 'axios';

// Thunks for API calls
export const registerUser = createAsyncThunk(
    'pokemon/registerUser',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'pokemon/loginUser',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
            // Save token to local storage or cookies if needed
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchMyPokemonList = createAsyncThunk(
    'pokemon/fetchMyPokemonList',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/pokemon/my-pokemon', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addPokemonToBackend = createAsyncThunk(
    'pokemon/addPokemonToBackend',
    async ({ pokemon, token }: { pokemon: any; token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/pokemon/add-pokemon', pokemon, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const releasePokemonFromBackend = createAsyncThunk(
    'pokemon/releasePokemonFromBackend',
    async ({ name, token }: { name: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/pokemon/release-pokemon', {
                headers: { Authorization: `Bearer ${token}` },
                data: { name },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

interface PokemonState {
    selectedPokemon: PokemonDetails | null;
    myPokemonList: UserLogin;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    token: string | null; // Added token state
}

const initialState: PokemonState = {
    selectedPokemon: null,
    myPokemonList: {
        username: "",
        isAuthenticated: false,
        myPokemonList: [],
    },
    status: 'idle',
    error: null,
    token: localStorage.getItem('token') || null, // Load token from local storage
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setSelectedPokemon: (state, action: PayloadAction<PokemonDetails | null>) => {
            state.selectedPokemon = action.payload;
        },
        addPokemon: (state, action: PayloadAction<PokemonDetails>) => {
            state.myPokemonList.myPokemonList.push(action.payload);
        },
        signinPokemon: (state, action: PayloadAction<any>) => {
            state.myPokemonList.isAuthenticated = true;
            state.myPokemonList.username = action.payload.username;
            state.token = action.payload.token;
        },
        signoutPokemon: (state) => {
            state.myPokemonList.isAuthenticated = false;
            state.myPokemonList.username = "";
            state.myPokemonList.myPokemonList = [];
            state.token = null;
            localStorage.removeItem('token'); // Clear token from local storage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally handle the result if needed
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.myPokemonList.isAuthenticated = true;
                state.myPokemonList.username = action.payload.username;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchMyPokemonList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMyPokemonList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.myPokemonList.myPokemonList = action.payload;
            })
            .addCase(fetchMyPokemonList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addPokemonToBackend.fulfilled, (state, action) => {
                state.myPokemonList.myPokemonList.push(action.payload);
            })
            .addCase(releasePokemonFromBackend.fulfilled, (state, action) => {
                state.myPokemonList.myPokemonList = state.myPokemonList.myPokemonList.filter(
                    (pokemon) => pokemon.name !== action.payload.name
                );
            });
    },
});

export const { setSelectedPokemon, signinPokemon, signoutPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
