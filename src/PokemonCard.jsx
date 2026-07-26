import "./index.css";
import PropTypes from "prop-types";

const TYPE_COLORS = {
  fire:     "#ff5722", water:    "#42a5f5", grass:    "#66bb6a",
  electric: "#ffa726", psychic:  "#ba68c8", normal:   "#a1887f",
  ground:   "#bcaaa4", rock:     "#8d6e63", bug:      "#9ccc65",
  ghost:    "#9575cd", poison:   "#ab47bc", fairy:    "#f06292",
  fighting: "#ef5350", dragon:   "#7e57c2", ice:      "#4dd0e1",
  dark:     "#546e7a", steel:    "#90a4ae", flying:   "#81d4fa",
};

export function PokemonCard({ data }) {
  const { id, name, types, sprites, height, weight, stats, base_experience, abilities } = data;

  const primaryType = types[0].type.name;
  const accentColor = TYPE_COLORS[primaryType] || "#777";

  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const speed = stats[5].base_stat;

  return (
    <li className="pokemon-card" style={{ "--card-accent": accentColor }}>
      <figure>
        <img
          src={sprites.other?.dream_world?.front_default || sprites.front_default}
          className="pokemon-image"
          alt={name}
          loading="lazy"
        />
      </figure>

      <span className="pokemon-id">#{String(id).padStart(3, "0")}</span>
      <h2 className="pokemon-name">{name.toUpperCase()}</h2>

      <div className="type-tags">
        {types.map(({ type }) => (
          <span
            key={type.name}
            className="type-tag"
            style={{ backgroundColor: TYPE_COLORS[type.name] || "#777" }}
          >
            {type.name}
          </span>
        ))}
      </div>

      <div className="grid-three-cols">
        <p className="pokemon-info-p">Height <span>{height}</span></p>
        <p className="pokemon-info-p">Weight <span>{weight}</span></p>
        <p className="pokemon-info-p">Speed <span>{speed}</span></p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info"><span>HP</span><p>{hp}</p></div>
        <div className="pokemon-info"><span>Attack</span><p>{attack}</p></div>
        <div className="pokemon-info">
          <span>Ability</span>
          <p>{abilities[0]?.ability.name ?? "—"}</p>
        </div>
      </div>

      <div className="stat-bar-row">
        <span className="stat-label">EXP</span>
        <div className="stat-bar">
          <div
            className="stat-bar-fill"
            style={{ width: `${Math.min((base_experience / 340) * 100, 100)}%`, background: accentColor }}
          />
        </div>
        <span className="stat-value">{base_experience}</span>
      </div>
    </li>
  );
}

PokemonCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired,
    sprites: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    stats: PropTypes.array.isRequired,
    base_experience: PropTypes.number,
    abilities: PropTypes.array,
  }).isRequired,
};