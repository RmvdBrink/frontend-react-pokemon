import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Button from "./components/button/Button";
import Pokemon from "./components/Pokemon/Pokemon";
import Pika from "./assets/pokemon.jpg"
function App() {
    const [pokemons, setPokemons] = useState([]);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);

            try {
                setError(false);
                const {data} = await axios.get(endpoint,   {signal: controller.signal});
                setPokemons(data);
            } catch (e) {
                // console.error(e)
                setError(true)

                if(axios.isCancel(e)){
                    console.log('The axios request was cancelled')
                } else {
                    console.error(e)
                }
            }

            toggleLoading(false)
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint])

    return (
        <div className="poke-deck">
            {pokemons &&
                <>
                    <img alt="logo" width="400px" src={Pika} />
                    <section className="button-bar">
                        <Button
                            disabled={!pokemons.previous}
                            clickHandler={() => setEndpoint(pokemons.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!pokemons.next}
                            clickHandler={() => setEndpoint(pokemons.next)}
                        >
                            Volgende
                        </Button>
                    </section>

                    {pokemons.results && pokemons.results.map((pokemon) => {
                        console.log(pokemon)
                        return <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
                    })}
                    <section className="button-bar">
                        <Button
                            disabled={!pokemons.previous}
                            clickHandler={() => setEndpoint(pokemons.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!pokemons.next}
                            clickHandler={() => setEndpoint(pokemons.next)}
                        >
                            Volgende
                        </Button>
                    </section>
                </>
            }
            {loading && <p>Loading...</p>}
            {error && <p>Er is iets mis bij het ophalen van de data</p>}
        </div>
    );
}

export default App;
