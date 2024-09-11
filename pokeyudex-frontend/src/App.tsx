import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ListPokemonPage from './components/ListPokemonPage';
import LoginPage from './components/LoginPage';
import MyListPokemonPage from './components/MyListPokemonPage';
import Navbar from './components/Navbar';
import RegisterPage from './components/RegisterPage';
import { store } from './redux/store';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          {/* Navbar ditempatkan di luar kontainer */}
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Pokeyudex
            </h1>
            <Navbar />
            <Routes>
              <Route path="/" element={<ListPokemonPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              {/* Navigasi ke MyListPokemonPage hanya jika ada pokemon di daftar */}
              <Route
                path="/mypokemons"
                element={<MyListPokemonPage />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
