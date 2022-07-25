import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Input
} from 'reactstrap';
import { useJson } from '../helpers/hooks';
import './App.scss';
/*
 Before React in Vanilla Javascript
const data = [{name: "Tensae"}, {name: "Trinity"}]

const divContainer = document.querySelector("#app");

divContainer.innerHTML = data;

data.push({name: "Ajax"})

divContainer.innerHTML = data;

data.push({name: "Diego"})

divContainer.innerHTML = data;
*/

// Display abilities, types, height, sprite
// eslint-disable-next-line react/prop-types
const Data = ({ pokemonChar }) => {
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonChar}`;
  const newLocal = useJson(BASE_URL);
  const {
    response: {
      // eslint-disable-next-line object-curly-newline
      abilities, types, height, sprites /* Grabs out the specific keys for easyier access later */ } = {} /* Sets the default value of response to an empty object */ } = newLocal;

  const pokemonData = {
    abilities,
    types,
    height,
    sprites,
  };

  // const [pokemonData, setPokemonData] = useState({});
  // useEffect(() => {
  //   // setPokemonData({ abilities, types, height, sprites })
  //   // const pokemonData = { abilities, types, height, sprites }; /* Shorthand Notation */
  //     /*
  //       Normal/Longhand Notation
  //       const pokemonData = {
  //         abilities: abilities,
  //         types: types,
  //         height: height,
  //         sprites: sprites,
  //       }
  //     */
  //   },[abilities, types, height, sprites]
  // )

  return <>{pokemonChar && JSON.stringify(pokemonData)}</>;
};

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [submitValue, setSubmitValue] = useState('');

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitValue(userInput);
  };

  return (
    <div className="App">
      <p>Pokedex</p>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Input type="text" name="name" placeholder="Any pokemon name..." onChange={handleChange} value={userInput} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      {submitValue && <Data pokemonChar={submitValue} />}
    </div>
  );
};

export default App;
