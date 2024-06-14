import React, { useState, useEffect } from "react";
import PokemonContext from "./PokemonContext";
import handleFetch from "../utils/handleFetch";

const starterPokemon = [
  {
    id: 0,
    name: "butterfree 1",
    hp: 60,
    front:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png",
  },
  {
    id: 1,
    name: "butterfree 2",
    hp: 60,
    front:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png",
  },
  {
    id: 2,
    name: "butterfree 3",
    hp: 60,
    front:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png",
  },
];

const PokemonProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState(starterPokemon);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await handleFetch("http://localhost:4000/pokemon");
        if (Array.isArray(data)) {
          setAllPokemon(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  const contextValues = {
    allPokemon,
    setAllPokemon,
  };

  return (
    <PokemonContext.Provider value={contextValues}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
