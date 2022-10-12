import {writable} from "svelte/store";

export const data1 = writable([]);

const fetchData = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
  const res = await fetch(url);
  const data = await rees.json();
  const res = data.results.map((data, index) => {
    return {
      name: data.name,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }
  });
console.log(res);
  data1.set(res);
};

fetchData();
