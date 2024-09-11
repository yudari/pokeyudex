// PokemonDetail.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setSelectedPokemon, addPokemonToBackend, fetchMyPokemonList } from '../redux/pokemonSlice';
import { useNavigate } from 'react-router-dom';

const calculateFibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
};

const PokemonDetail: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);
    const listMyCollectionPokemon = useSelector((state: RootState) => state.pokemon.myPokemonList.myPokemonList);
    const { isAuthenticated } = useSelector((state: RootState) => state.pokemon.myPokemonList);
    const { token } = useSelector((state: RootState) => state.pokemon)
    const [nickname, setNickname] = useState('');
    const [catchResult, setCatchResult] = useState<any>(null);
    const [isPokemonCaught, setIsPokemonCaught] = useState(false);


    useEffect(() => {
        setCatchResult(null);
        setIsPokemonCaught(false);
        setNickname('');
    }, [selectedPokemon]);

    if (!selectedPokemon) {
        return (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-4 capitalize text-white text-center">Cari Pokemon-mu dan Tangkap Mereka</h2>
            </div>
        );
    }

    // Check if Pokemon is already in collection
    const isCaught = listMyCollectionPokemon.some(pokemon => pokemon.name === selectedPokemon.name);

    const handleCatch = () => {
        const success = Math.random() < 0.5;
        if (isAuthenticated) {
            if (success) {
                setCatchResult('success');
            } else {
                setCatchResult('failed');
            }
        } else {
            console.log(`Belum Login`);
            navigate('/login');
        }
    };

    const handleAddToMyList = () => {
        if (catchResult === 'success' && nickname) {
            // Calculate Fibonacci number based on total number of captured Pokémon
            const totalCaptured = listMyCollectionPokemon.length;
            const fibonacciNumber = calculateFibonacci(totalCaptured);
            const newNickname = `${nickname}-${fibonacciNumber}`;
            const newPokemon = { ...selectedPokemon, nickname: newNickname };
            dispatch(addPokemonToBackend({ pokemon: { name: newPokemon.name, nickname: newPokemon.nickname, sprite: newPokemon.sprites.front_default }, token: token ?? '' }))
            setIsPokemonCaught(true);

        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 capitalize text-white text-center">{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} className="w-48 h-48 mx-auto" />
            <div className="text-white">
                <p><strong>Tinggi:</strong> {selectedPokemon.height}</p>
                <p><strong>Berat:</strong> {selectedPokemon.weight}</p>
                <p><strong>Exp:</strong> {selectedPokemon.base_experience}</p>
                <p><strong>Skills:</strong> {selectedPokemon.moves.slice(0, 10).map((move) => move.move.name).join(', ')}</p>
                <p><strong>Tipe Elemen:</strong> {selectedPokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>


            {isCaught ? (
                <p className="text-green-500 font-bold mt-4">Pokemon sudah tertangkap!</p>
            ) : (
                <>
                    {!isPokemonCaught && (
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCatch}>
                                Tangkap!
                            </button>
                            {catchResult === 'success' && (
                                <div className='flex flex-row gap-2'>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        placeholder="Nickname"
                                        className="bg-gray-700 text-white p-2 rounded mt-2"
                                    />
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                                        onClick={handleAddToMyList}
                                        disabled={!nickname}
                                    >
                                        Tambahkan ke koleksi
                                    </button>
                                </div>
                            )}
                            {catchResult === 'failed' && (
                                <p className="text-red-500 mt-2">Gagal ditangkap!</p>
                            )}
                        </div>
                    )}
                    {isPokemonCaught && (
                        <p className="text-green-500 font-bold mt-4">Pokemon tertangkap!</p>
                    )}
                </>
            )}
        </div>
    );
};

export default PokemonDetail;
