import { useState, useEffect } from 'react';

function PokemonList() {
  const [list, setList] = useState([]); // State - save poke

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => {
        setList(data.results);
      });
  }, []); 

  return (
    <ul>
      {list.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  );
}