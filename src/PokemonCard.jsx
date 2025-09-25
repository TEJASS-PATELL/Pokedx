import React from "react";
import './index.css';

const typeColors = {
  fire: "orangered",
  water: "#42a5f5",
  grass: "rgb(23, 255, 38)",
  electric: "orange",
  psychic: "#ba68c8",
  normal: "#a1887f",
  ground: "#bcaaa4",
  rock: "#8d6e63",
  bug: "rgb(144, 255, 40)",
  ghost: "#9575cd",
  poison: "#ab47bc",
  fairy: "#f06292",
  fighting: "red",
  dragon: "#7e57c2",
  ice: "#4dd0e1",
  dark: "#455a64",
  steel: "#90a4ae",
  flying: "#81d4fa",
};

export function PokemonCard({ data }) {
    const primaryType = data.types[0].type.name;
  const highlightStyle = {
    backgroundColor: typeColors[primaryType] || "#e0f7fa",
    color: "#fff",
    borderRadius: "10px",
    padding: "5px 10px",
    display: "inline-block",
    fontWeight: "bold",
    textTransform: "capitalize",
  };
  return (
    <>
      <li className="pokemon-card">
        <figure>
          <img
            src={data.sprites.other.dream_world.front_default}
            className="pokemon-image"
          ></img>
        </figure>
        <h1 className="pokemon-name">{data.name.toUpperCase()}</h1>
        <div className="pokemon-highlight" style={highlightStyle}>
          <p>{data.types.map((currelm) => currelm.type.name).join(",  ")}</p>
        </div>
        <div className="grid-three-cols">
          <p className="pokemon-info-p">
            Height <span> {data.height} </span>
          </p>
          <p className="pokemon-info-p">
            Weight <span> {data.weight}</span>
          </p>
          <p className="pokemon-info-p">
            speed <span>{data.stats[5].base_stat}</span>
          </p>
        </div>
        <div className="grid-three-cols">
          <div className="pokemon-info">
            <span> Experience</span>
            <p>{data.base_experience}</p>
          </div>
          <div className="pokemon-info">
            <span>Attack</span>
            <p>{data.stats[1].base_stat}</p>
          </div>
          <div className="pokemon-info">
            <span> Abilities </span>
            <p>
              {data.abilities
                .map((abilityInfo) => abilityInfo.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
          </div>
        </div>
      </li>
    </>
  );
}
