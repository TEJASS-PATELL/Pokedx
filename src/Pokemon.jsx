import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './index.css'
import { PokemonCard } from './PokemonCard';
function Pokemon() {

    const [pokemon, setpokemon] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null)
    const [searchpkm, setsearchpkm] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

    const fetchpokemon = async () => {
        try {
            const fetchAPI = await fetch(API);
            const data = await fetchAPI.json();
            console.log(data);

            const deatiledData = data.results.map(async (currpokemon) => {
                const res = await fetch(currpokemon.url);
                const data = await res.json();
                return data;
            })

            console.log(deatiledData);

            const detailresp = await Promise.all(deatiledData);

            console.log(detailresp);
            setpokemon(detailresp);
            setloading(false);
        } catch (error) {
            console.log(error);
            seterror(error);
            setloading(false);
        }
    }
    useEffect(() => {
        fetchpokemon();
    }, [])

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <h2>Loading, please wait...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <>
                <h1>Error : {error.message}</h1>
            </>
        )
    }

    const SearchPokemon = pokemon.filter((currpokem) => currpokem.name.toLowerCase().includes(searchpkm.toLowerCase()));

    return (
        <>
            <section className='container'>
                <header>
                    <img className='pokeball' src='../public/images/lock.png'></img>
                    <h1>Pokedx</h1>
                </header>
                <div className='pokemon-search'>
                    <input type="text" value={searchpkm} onChange={(e) => setsearchpkm(e.target.value)} placeholder='Search Pokemon'></input>
                </div>
                <div>
                    <ul className='pokemon-cards'>
                        {/* {pokemon.map((currpokemon) => {  / only static not for searching */}
                        {SearchPokemon.map((currpokemon) => {
                            return (
                                <PokemonCard key={currpokemon.id} data={currpokemon}></PokemonCard>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Pokemon;