import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signinPokemon } from '../redux/pokemonSlice';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim().length > 0 && password.trim().length > 0) {
            dispatch(loginUser({ username, password }))

        } else {
            alert('Tolong isi username dan password anda');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex justify-center items-start mt-7 min-h-screen">
            <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl font-bold text-center text-white mb-6">
                    Selamat Datang Di Pokeyudex
                </h1>
                <p className="text-center text-gray-400 mb-4">
                    Login dulu sebelum nangkep Pokémonmu
                </p>
                <form onSubmit={handleSubmitLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-300 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <h3 className='text-center'>Belum punya akun ? <button className=' mt-4 font-bold text-white hover:text-purple-500 hover:cursor-pointer' onClick={() => {
                    navigate('/register')
                }}>Daftar Dulu</button>
                </h3>

            </div>
        </div>
    );
};

export default LoginPage;
