import React, { useState } from "react";

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) return null;

  const [showFrontSprite, setShowFrontSprite] = useState(true);

  const toggleSprite = () => {
    setShowFrontSprite((prevState) => !prevState);
  };

  return (
    <div className="ui card" onClick={toggleSprite}>
      <div>
        <div className="image">
          <img
            alt={pokemon.name}
            src={showFrontSprite ? pokemon.front : pokemon.back}
          />
        </div>
        <div className="content">
          <div className="header">{pokemon.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {pokemon.hp} HP
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
