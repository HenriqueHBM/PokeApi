const pokemons = [
  { id: '025', name: 'pikachu', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' }
  // ...
];

function carregarNotas(){

const container = document.getElementById('card_pokemon');


container.innerHTML = ''; // limpa o container

pokemons.forEach(pokemon => {
  const card = document.createElement('div');
  card.classList.add('cardpokemon');

  const img = document.createElement('img');
  img.src = pokemon.image;
  img.alt = pokemon.name;

  const texto = document.createElement('div');
  texto.classList.add('texto');

  const pId = document.createElement('p');
  pId.textContent = `#${pokemon.id}`;

  const pName = document.createElement('p');
  pName.textContent = pokemon.name;

  texto.appendChild(pId);
  texto.appendChild(pName);

  card.appendChild(img);
  card.appendChild(texto);

  container.appendChild(card);
});

}

carregarNotas()

localStorage.setItem("salvo", JSON.stringify(pokemons));

const recuperado = JSON.parse(localStorage.getItem("salvo"));

console.log(recuperado);