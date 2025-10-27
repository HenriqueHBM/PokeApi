/*const pokemons = [
  { id: '025', name: 'pikachu', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' },
  { id: '001', name: 'bulbasaur', image: '/public/images/pikachu.webp' }
  // ...
];*/

function carregarNotas(poke) {

  const container = document.getElementById('card_pokemon');


  container.innerHTML = ''; // limpa o container


  poke.forEach(pokemon => {

    const link = document.createElement('a');
    link.href = `/src/views/pokemon.html?id=${pokemon.id}`;

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

    const descricao = document.createElement('textarea');
    descricao.innerHTML = ` <textarea name="comentario" id="comentario" rows="4" cols="50" placeholder="Digite seus comentarios aqui"><!--rows de linha e cols de coluna--></textarea>`;

    texto.appendChild(descricao);
    texto.appendChild(pId);
    texto.appendChild(pName);

    card.appendChild(img);
    card.appendChild(texto);

    link.appendChild(card);

    container.appendChild(link);
  });

}

carregarNotas(JSON.parse(localStorage.getItem("salvo")))

/*carregarNotas()

localStorage.setItem("salvo", JSON.stringify(pokemons));

const recuperado = JSON.parse(localStorage.getItem("salvo"));

console.log(recuperado);*/
