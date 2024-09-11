import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
    const { username, myPokemonList, isAuthenticated, } = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const { token } = useSelector((state: RootState) => state.pokemon);
    return (
        <nav>
            <div className="container mx-auto px-4 py-4 flex justify-center items-center">
                <ul className="flex space-x-4">
                    {!isAuthenticated && <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-500 hover:text-blue-700'
                                    : 'text-gray-300 hover:text-gray-500'
                            }
                        >
                            Home
                        </NavLink>
                    </li>}

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-500 hover:text-blue-700'
                                    : 'text-gray-300 hover:text-gray-500'
                            }
                        >
                            Pokemons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mypokemons"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-500 hover:text-blue-700'
                                    : 'text-gray-300 hover:text-gray-500'
                            }
                        >
                            My Pokemons
                        </NavLink>
                    </li>



                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
