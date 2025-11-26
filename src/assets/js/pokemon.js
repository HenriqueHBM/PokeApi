import { first_letter_up } from '/src/app.js';

async function info_pokemon(id){
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp => resp.json());
}

async function carregarPokemon(){
    const params = new URLSearchParams(document.location.search);
    const id_pokemon = params.get('id');

    const pokemon = await info_pokemon(id_pokemon);
    
    document.getElementById('pokemon-nome').innerText = first_letter_up(pokemon.name);
    document.getElementById('pokemon_numero').innerText = "#"+id_pokemon;
    document.getElementById('pokemon-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id_pokemon}.png`

    formata_tipos(pokemon.types);
    const descricao = await info_descricao(id_pokemon);
    document.getElementById('pokemon_descricao').innerText = (descricao.flavor_text_entries[0].flavor_text.replace(/\n/g, ' '));
    
}

function formata_tipos(tipos){
    const lista_tipos = document.getElementById('pokemon_tipos');
    tipos.forEach(element => {
        let tipo = document.createElement('span');
        tipo.classList.add(`tipo`);
        tipo.style = `background: var(--${element.type.name}-c); border-color:var(--${element.type.name}-b)`;
        tipo.innerText = first_letter_up(element.type.name);
        lista_tipos.appendChild(tipo)
    });
}

function info_descricao(id){
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(resp => resp.json());
}

carregarPokemon();