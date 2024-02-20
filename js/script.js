//generador de nuemro random
function generarNumeroRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

//variables para guardar los numeros random
const numeroAleatorio = generarNumeroRandom(905);

//url de la api que se utiliza
const url = `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`;

//Obteniendo informacion de la api
async function obtenerInformacionPokemon(url) {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.other.home.front_default,
    types: data.types.map((type) => {
      const typeColor = typeColors[type.type.name];
      const boxTypeColor = boxTypeColors[type.type.name];
      return `<span class="type" style="background-color: ${typeColor}; box-shadow: 0 0 0.25em 0.03em ${boxTypeColor}; -webkit-box-shadow: 0 0 0.25em 0.03em ${boxTypeColor};">${type.type.name}</span>`;
    }),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: data.stats.map((stat) => {
      const statBase = stat.base_stat;
      const statName = stat.stat.name;
      return `<span>${statBase} ${statName}</span>`;
    }),
    height: data.height / 10,
    weight: data.weight / 10,
  };
}

//constante que guarda el color del tipo
const typeColors = {
  normal: "#a0a0a0",
  fire: "#ff3700",
  water: "#0094e5",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const boxTypeColors = {
  normal: "#a0a0a0",
  fire: "#ff3700",
  water: "#0094e5",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

function displayPokeInfo(pokemon, targetId) {
  const pokemonDiv = document.getElementById(targetId);
  const html = `
    <h2>${pokemon.name}</h2>
    <div class="img">
    <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
    <div class="txt">
    <p>ID: ${pokemon.id}</p>
    <p>Height: ${pokemon.height}M</p>
    <p>Weight: ${pokemon.weight}kg</p>
    <div class="tp">
    <p>Types: ${pokemon.types.join(" ")}</p>
    </div>
    <p>Abilities: ${pokemon.abilities.join(" ")}</p>
    </div>
  `;
  pokemonDiv.innerHTML = html;
}

(async () => {
  try {
    const pokeInfo = await obtenerInformacionPokemon(url);
    displayPokeInfo(pokeInfo, "pokemon-player");
  } catch (error) {
    console.error("Error al obtener información del Pokémon:", error);
  }
})();
