const galleryContainer = document.getElementById("gallery-container");

// async function getPokemonData() {
//   for (let i = 1; i <= 15; i++) {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
//     const data = await response.json();
//     const imgSrc = data.sprites.front_default;
//     const cryUrl = `https://pokemoncries.com/cries/${i}.mp3`;

//     const imgElement = document.createElement("img");
//     imgElement.src = imgSrc;
//     imgElement.alt = `Image of ${data.name}`;
//     imgElement.dataset.cryUrl = cryUrl;

//     imgElement.addEventListener("mouseover", playCry);
//     imgElement.addEventListener("mouseout", stopCry);

//     galleryContainer.appendChild(imgElement);
//   }
// }

async function getPokemonData(typeUrl) {
    // Clear the existing Pokémon images in the gallery
    galleryContainer.innerHTML = "";
  
    const response = await fetch(typeUrl);
    const data = await response.json();
  
    // Loop through the Pokémon of the selected type and display their images
    for (const pokemon of data.pokemon.slice(0, 8)) {
      const pokemonResponse = await fetch(pokemon.pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const imgSrc = pokemonData.sprites.front_default;
      const cryUrl = `https://pokemoncries.com/cries/${pokemonData.id}.mp3`;
  
      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = `Image of ${pokemonData.name}`;
      imgElement.dataset.cryUrl = cryUrl;
  
      imgElement.addEventListener("mouseover", playCry);
      imgElement.addEventListener("mouseout", stopCry);
  
      galleryContainer.appendChild(imgElement);
    }
  }

  const pokemonNameElement = document.getElementById("pokemon-name");

  function playCry(event) {
    const audio = new Audio(event.target.dataset.cryUrl);
    audio.play();
    event.target.dataset.audioId = audio;
  
    // Set the Pokémon name
    pokemonNameElement.textContent = event.target.alt.replace("Image of ", "");
  }

  function stopCry(event) {
    const audio = event.target.dataset.audioId;
    audio.pause();
  
    // Reset the Pokémon name to "Choose your Pokémon"
    pokemonNameElement.textContent = "Choose your Pokémon";
  }

getPokemonData();

const typeCarousel = document.getElementById("type-carousel");

async function getTypeData() {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const data = await response.json();

  data.results.forEach((type) => {
    const typeButton = document.createElement("button");
    typeButton.textContent = type.name;
    typeButton.addEventListener("click", () => getPokemonData(type.url));

    typeCarousel.appendChild(typeButton);
  });
}

getTypeData();