import React from "react";
import PokemonProvider from "./context/PokemonProvider";
import PokemonForm from "./components/PokemonForm";
import Filter from "./components/Filter";
import PokemonCollection from "./components/PokemonCollection";
import ErrorBoundary from "./components/ErrorBoundary";
const App = () => {
  return (
    <PokemonProvider>
      <ErrorBoundary>
        <div className="App ui container">
          <h1>Pokedex</h1>
          <br />
          <PokemonForm />
          <br />
          <Filter />
          <br />
          <PokemonCollection />
        </div>
      </ErrorBoundary>
    </PokemonProvider>
  );
};

export default App;
