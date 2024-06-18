import React, { useContext } from "react";
import PokemonContext from "../context/PokemonContext";

const Filter = () => {
  const { allPokemon, setAllPokemon } = useContext(PokemonContext);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    /* FEEDBACK:

    Be careful here. What you're doing here is completely changing
    what the `allPokemon` value is which means that as you filter,
    you can't un-filter since you're removing values from allPokemon
    each time you filter. 
    
    Instead, use the filter to only change what is being rendered 
    in PokemonCollection rather than changing the actual data stored 
    in `allPokemon`. How can you share the current searchTerm state 
    with your PokemonCollection so that it knows what pokemon to show?
    */
    setAllPokemon(filteredPokemon);
  };

  /* FEEDBACK: This is not a controlled form. Look up "React Controlled
  Forms" and see how you can refactor your code to make this a 
  controlled form.
  */

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
