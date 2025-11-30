// const pokemons = [
//   { id: '1', name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' }
// ];

import { formata_index } from '/src/app.js';
function carregarNotas(poke) {

  const container = document.getElementById('card_pokemon');


  container.innerHTML = ''; // limpa o container


  poke.forEach(pokemon => {

    const link = document.createElement('a');
    link.href = `/src/views/pokemon.html?id=${pokemon.id}`;
    link.innerHTML = `
      <div class='cardpokemon'>
        <img src='${pokemon.image}' alt='${pokemon.name}' />
        <div class='container_text_bn'> 
          <p class='text-link-card'>#${formata_index(pokemon.id)}</p>
          <p class='text-link-card'>${pokemon.name}</p>

          <button class='excluir_pokemon'
            onclick="event.stopPropagation(); event.preventDefault(); excluir_salvo(${pokemon.id})">
            <img src='/public/icons/trash.png' width='5%' />
            Excluir
          </button>
        </div>
      </div>
    `;
    container.appendChild(link);
  });

}



carregarNotas(JSON.parse(localStorage.getItem("salvo")));

/*carregarNotas()

localStorage.setItem("salvo", JSON.stringify(pokemons));

const recuperado = JSON.parse(localStorage.getItem("salvo"));

console.log(recuperado);*/
