const pokemonName = document.querySelector('.pokemon__data--name');
const pokemonNumber = document.querySelector('.pokemon__data--number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const pokeStats = document.querySelector('.info__stats');
const pokeTypes = document.querySelector(".info__types");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return APIResponse.status === 200? await APIResponse.json():"";

}

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (!data) {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  } else {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    renderPokemonStats(data.stats);
    renderPokeTypes(data.types)
  }
}

const renderPokemonStats = stats => {
  pokeStats.innerHTML = '';
  stats.forEach(stat => {
      const statElement = document.createElement("div");
      const statElementName = document.createElement("div");
      const statElementAmount = document.createElement("div");
      statElementName.textContent = stat.stat.name;
      statElementAmount.textContent = stat.base_stat;
      statElement.appendChild(statElementName);
      statElement.appendChild(statElementAmount);
      pokeStats.appendChild(statElement);
  });
}

const renderPokeTypes = (types) =>{   
  pokeTypes.innerHTML = "";
  let cont = 0
  types.forEach(type => {
      cont+=1;
      const elementType = document.createElement("div");
      const elementContentType = document.createElement("div");
      elementType.textContent = type.type.name;
      if(cont>1){
        elementType.style.backgroundColor = "#C3B032";
        elementType.style.paddingTop = "10px"
        elementType.style.borderRadius = "50%";
        elementType.style.borderWidth = "1px";
        elementType.style.paddingRight = "6px";
        elementType.style.paddingLeft = "6px";
        elementType.style.borderColor = "#000000";
        elementType.style.borderStyle = "solid";
        elementType.style.width = "27px"
        elementType.style.height = "27px"
        elementType.style.fontSize = "9px"
        elementType.style.boxShadow = "inset -3px -3px 15px 2px #625819";
        pokeTypes.appendChild(elementType);
        return;
      }
        elementType.style.color = "#fff";
        elementType.style.backgroundColor = "#B1AF9E";
        elementType.style.width = "40px"
        elementType.style.height = "15px"
        elementType.style.paddingRight = "6px";
        elementType.style.paddingLeft = "6px";
        elementType.style.paddingBottom = "1px";
        elementType.style.paddingTop = "2px";
        elementType.style.borderRadius = "2.7px";
        elementType.style.boxShadow = "inset -3px -3px 15px 2px #767469";
        elementType.style.textShadow = "0 1px 0 rgba(255,255,255,0.3)";
        elementContentType.style.backgroundColor = "#DAD1DA";
        elementContentType.style.borderStyle = "solid";
        elementContentType.style.borderWidth = "1px";
        elementContentType.style.borderColor = "#000000";
        elementContentType.style.padding = "10px";
        elementContentType.style.boxShadow = "inset -2px 3px 4px #808080";
        elementContentType.appendChild(elementType);
        pokeTypes.appendChild(elementContentType);   
  });     
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);


























