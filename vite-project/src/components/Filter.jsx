import React, { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

const Filter = () => {
  const { allPokemon, setAllPokemon } = useContext(PokemonContext);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    setAllPokemon(filteredPokemon);
  };

  return (
    <div className="ui fluid input">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
