import React, { useState, useContext } from "react";
import PokemonContext from "../context/PokemonContext";

const PokemonForm = () => {
  const { setAllPokemon } = useContext(PokemonContext);
  const [name, setName] = useState("");
  const [hp, setHp] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPokemon = {
      id: Date.now(),
      name,
      hp: parseInt(hp, 10),
      front,
      back,
    };
    setAllPokemon((prevPokemon) => [...prevPokemon, newPokemon]);

    // Reset form fields
    setName("");
    setHp("");
    setFront("");
    setBack("");
  };

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="four fields" widths="equal">
          <div className="field ui fluid">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="field ui fluid">
            <label>HP</label>
            <input
              type="text"
              name="hp"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              placeholder="HP"
            />
          </div>
          <div className="field ui fluid">
            <label>Front Image URL</label>
            <input
              type="text"
              name="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="url"
            />
          </div>
          <div className="field ui fluid">
            <label>Back Image URL</label>
            <input
              type="text"
              name="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="url"
            />
          </div>
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PokemonForm;
