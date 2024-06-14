import React, { useContext } from "react";
import PokemonCard from "./PokemonCard";
import PokemonContext from "../context/PokemonContext";

const PokemonCollection = () => {
  const { allPokemon } = useContext(PokemonContext);

  // Filter out invalid data
  const validPokemon = allPokemon.filter((pokemon) => pokemon && pokemon.id);

  return (
    <div className="ui cards">
      {validPokemon.map(({ id, name, hp, front, back }) => (
        <PokemonCard key={id} pokemon={{ id, name, hp, front, back }} />
      ))}
    </div>
  );
};

export default PokemonCollection;
