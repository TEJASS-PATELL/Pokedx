import { useState, useEffect, useCallback, useMemo } from "react";
import { PokemonCard } from "./PokemonCard";
import "./index.css";

const API = "https://pokeapi.co/api/v2/pokemon?limit=400&offset=0";

const ALL_TYPES = [
  "all", "fire", "water", "grass", "electric", "psychic", "normal",
  "ground", "rock", "bug", "ghost", "poison", "fairy", "fighting",
  "dragon", "ice", "dark", "steel", "flying",
];

const PAGE_SIZE = 40;

export default function Pokemon() {
  const [pokemon, setPokemon]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState("");
  const [activeType, setActiveType]   = useState("all");
  const [page, setPage]               = useState(1);

  const fetchPokemon = useCallback(async () => {
    try {
      const res  = await fetch(API);
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map((p) => fetch(p.url).then((r) => r.json()))
      );

      setPokemon(detailed);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPokemon(); }, [fetchPokemon]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return pokemon.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchType =
        activeType === "all" ||
        p.types.some((t) => t.type.name === activeType);
      return matchName && matchType;
    });
  }, [pokemon, search, activeType]);

  const totalPages  = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleType = (type) => {
    setActiveType(type);
    setPage(1);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner" />
      <h2>Loading Pokédex…</h2>
    </div>
  );

  if (error) return (
    <div className="loading-container">
      <h2>Error: {error.message}</h2>
    </div>
  );

  return (
    <section className="container">
      <header>
        <img className="pokeball" src="./lock.png" alt="pokeball" />
        <h1>Pokédex</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Pokémon…"
          aria-label="Search Pokémon"
        />
      </div>

      <div className="type-filters">
        {ALL_TYPES.map((type) => (
          <button
            key={type}
            className={`type-btn type-btn--${type} ${activeType === type ? "active" : ""}`}
            onClick={() => handleType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <p className="results-count">{filtered.length} Pokémon found</p>

      <ul className="pokemon-cards">
        {paginated.map((p) => (
          <PokemonCard key={p.id} data={p} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setPage((v) => Math.max(1, v - 1))}
            disabled={page === 1}
          >
            ←
          </button>
          <span className="page-info">{page} / {totalPages}</span>
          <button
            className="page-btn"
            onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
            disabled={page === totalPages}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}