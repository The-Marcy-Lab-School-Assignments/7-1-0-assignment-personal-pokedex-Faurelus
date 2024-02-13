# Personal Pokedex

**Table of Contents**
- [Personal Pokedex](#personal-pokedex)
  - [Short Responses](#short-responses)
  - [App Overview](#app-overview)
  - [Features](#features)
  - [Set Up](#set-up)
    - [JSON Server API](#json-server-api)
    - [A Reminder About POSTing](#a-reminder-about-posting)
  - [Steps For Completing The First Feature In Assignment:](#steps-for-completing-the-first-feature-in-assignment)
    - [0. Check out the PokemonCollection](#0-check-out-the-pokemoncollection)
    - [1. Create the context](#1-create-the-context)
    - [2. Complete the Provider component](#2-complete-the-provider-component)
    - [3. Wrap the App in the provider](#3-wrap-the-app-in-the-provider)
    - [4. One More Step To Test:](#4-one-more-step-to-test)
    - [5. Fix the `PokemonCard`](#5-fix-the-pokemoncard)
    - [6. Fetch Pokemon Data](#6-fetch-pokemon-data)
  - [You're on your own now](#youre-on-your-own-now)
    - [Tip: Posting Sprites](#tip-posting-sprites)
    - [Bonus:](#bonus)



## Short Responses

Do them first!

## App Overview

In this assignment, you will build a React front-end application for browsing your collection of pokemon. You can view the pokemon you've already "caught", add new pokemon to your collection, and filter pokemon. In this app, you will practice:
* Using `useState` to manage the various pieces of state in your application
* Using the React Context API to establish global state values
* Using `useEffect` and `fetch` to read from a dummy API
* Creating controlled components
* Handling click events

![demo](./images/demo.gif)

## Features

- [ ] On load of the page, a user see a list of pokemon cards displaying each pokemon's name, front sprite, and HP level.
- [ ] A user can fill out and submit the form to create a new pokemon. This will display the new pokemon on the page and the new pokemon data should persist, even after the page is refreshed. This means you'll have to make a POST request to our JSON Server API!
- [ ] A user can use the search bar to filter pokemon by name.
- [ ] A user can click on a pokemon card to toggle seeing its front sprite or back sprite.

**Requirements**:
- [ ] The form must be a controlled component.
- [ ] This assignment must use React Context.

**Note:** We are requiring you use React Context for this assignment, however it does not mean that Context is necessarily the right tool for this job. For a project this small, Context may not be the best solution. However, for now, use it!

## Set Up

Make sure you `cd` into the project directory.

In one terminal, run `npm install` to set up dependencies. Then run `npm run dev` to start the React App. This is your Front-End.

In another terminal, run `json-server --watch db.json --port 4000` to start a mock back-end server on port 4000. If you get an error, make sure you have JSON server installed globally by running `npm install -g json-server`. Now, you will have a RESTful API that you can access via the URL `http://localhost:4000/pokemon`.

![](./images/split-terminal.gif)

### JSON Server API

JSON Server is a tool to we use to spin up a mock API. It is a great alternative when you don't have the time to build out a full Express API. It does have its limitation in that it cannot support a robust relationships database. Read the [JSON Server documentation](https://github.com/typicode/json-server#getting-started) for more information.

You will be using the API endpoint `http://localhost:4000/pokemon` for sending both GET and POST requests. 
* When sending a GET request, you will receive the `pokemon` JSON data in the `db.json` file.
* When sending a POST request, the request body will be added to `pokemon` array in that same file.

### A Reminder About POSTing
* When POSTing, you will need to include a `Content-Type: application/json` header.
* For the `body` of the request, see the data structure of the existing pokemon in `db.json` as an example of what to include in the `body`.
* See the example below of sending a POST request with `fetch` and an `options` object.

```js
const exampleOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ key: "value" }),
};
const url = "http://example.com/api";
const response = await fetch(url, exampleOptions);
const data = await response.json();
```

## Steps For Completing The First Feature In Assignment:

We'll walk through the process of fetching pokemon data and providing it via context to the entire application.

### 0. Check out the PokemonCollection

Open up `src/components/PokemonCollection`. This component demonstrates the basics of how to use context and we're giving it to you for free!

Check out how we import the `PokemonContext` and then use the `useContext` hook to bring in the required data (and only the required data) into the component.

Finally, see how we use the `pokemon` data to render a list of `PokemonCard` components.

But it doesn't work... Why? The `PokemonContext` doesn't exist yet and because the application hasn't been provided that context. Let's do that!

### 1. Create the context

Open up the `src/context/PokemonContext.jsx` file. This is where you'll create your context and export it.

This file is boilerplate (its _mostly_ the same in every project) so we will give it to you for free!

```jsx
// PokemonContext.jsx
import { createContext } from "react";

const PokemonContext = createContext();

export default PokemonContext;
```

We simply create the `PokemonContext` so that it may be used throughout our application. This `PokemonContext` object will serve as the "glue" connecting our `PokemonContext.Provider` with the components that use the context (`useContext(PokemonContext)`)

### 2. Complete the Provider component

Open up the `src/context/PokemonProvider.jsx` file. We've started things for you but you have to finish it.

This is where you will:
- Create and export the `PokemonProvider` component that will wrap around your entire application.
- Create the state values / setter functions in your application
- Make your fetch calls

You'll regularly return to this file as you build the features of this application.

1. Start by importing the `PokemonContext` you just created.
2. Then, return a `PokemonContext.Provider`, making sure to wrap the `children` prop.
3. Set `value` prop on the `PokemonContext.Provider` to `contextValues`.
4. Add the `pokemon` and `setPokemon` state values to the `contextValues` object.

Check out this example for reference:

```jsx
import { useState } from 'react';
import CountContext from './CountContext';

const CountContextProvider = ({children}) => {
  const [count, setCount] = useState(0);

  const contextValues = { count, setCount }

  return (
    <CountContext.Provider value={contextValues}>
      {children}
    </CountContext.Provider>
  )
}
```

As you add more state values to the context, you'll add those values to `contextValues`

### 3. Wrap the App in the provider

Open up the `main.jsx` file. Here is where you'll wrap the entire `App` component in the `PokemonProvider` you just created.

1. Import the `PokemonProvider` component.
2. Render the `PokemonProvider` component such that it fully wraps the `App` component

Here is a generic example:

```jsx
return (
  <Provider>
    <App />
  </Provider>
);
```

### 4. One More Step To Test:

At this point, you should have properly linked everything up. Your application now has context!

To test this out, recall that the `PokemonCollection` component is set up to use the `pokemon` value provided by the `PokemonContext`. However, nothing is rendered yet because the `pokemon` array is empty!

Head back to `src/context/PokemonProvider.jsx` and modify the code where the initial pokemon state is set up like so:

```jsx
// add this example object
const examplePokemon = {
  id: 12,
  name: "butterfree",
  hp: 60,
  front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
  back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
}
// and insert into the array 3 times.
const [pokemon, setPokemon] = useState([examplePokemon, examplePokemon, examplePokemon]);
```

Save your code, run your dev server, and you should see 3 rendered `PokemonCard` components without any data! (we'll work on getting the data to show next).

If this didn't see three blank `PokemonCard` components, go back through the first three steps before moving on.

### 5. Fix the `PokemonCard`

Open up the `src/components/PokemonCard` file and you'll see that there is a structure provided for you, but the content is incomplete. Each `PokemonCard` should display the front image of the pokemon, their name, and their HP (health points).

The data for these cards are not properly hooked up yet so you will need to work in the `src/components/PokemonCollection` file to pass the appropriate props to each card, and render the pokemon data in the card.

### 6. Fetch Pokemon Data

To populate the data in the `pokemon` array with "real" data, we need to fetch from the JSON server database that you should have up and running. If you don't have it running yet, run

```sh
npm i -D json-server # skip this if you have json-server already installed
json-server --watch db.json --port 4000
```

If you want, you can import the `fetch` helper function defined in the `src/utils.js` file:

Then, do the following in your `PokemonProvider`:

1. Remove the `examplePokemon` from your initial `pokemon` state. `pokemon` should start as an empty array.
1. Import `useEffect`
2. Invoke `useEffect` with a callback that fetches from your local JSON server API which should have the URL `"http://localhost:4000/pokemon"`.
3. If data is returned, it should update the `pokemon` state value.
4. Make sure that this effect only runs once when the application first renders.

If this worked properly, your `PokemonProvider` will re-render with the new `pokemon` values provided. As a result, you should see 12 cards.

## You're on your own now

At this point, we've practiced using context, `useEffect`, `useState`, and props. You're more than equipped to implement the remaining features on your own.

You got this!

### Tip: Posting Sprites

When posting new pokemon to the database, you'll need to include sprites for the front and back of the pokemon.

You can find pokemon sprites in this [GitHub Repo](https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon). But you should use the raw URL. For example:

- `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/<filename>.png`
- `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/<filename>.png`

### Bonus:

Add a feature to **additionally** filter pokemon by the HP amount. You can use any type of input, but we recommend using a [range input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range). For example, if the user sets the range value to 50, then only show pokemon with an HP value _equal to or over_ 50. Remember to store that value of the input in state!

[⬆ Jump back to the top ⬆](#features) to see the remaining features!