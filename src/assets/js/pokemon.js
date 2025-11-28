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
    

    base_statics(pokemon.stats);
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

function base_statics(stats){
    const base_stats = document.getElementById('base_stats');
    let soma_total = 0;
    stats.forEach(element => {
        let porcent_stats = (element.base_stat * 100) / 255;
        soma_total += element.base_stat;
        
        const barra = document.createElement('div');
        barra.classList.add('container-base-static');
        barra.innerHTML = `
            <h5 style='width:20%; text-align: end; '   class='name_stats'> ${first_letter_up(element.stat.name)} </h5>
            <h5 style='width:8%;  text-align: center;' class='name_stats'> ${(element.base_stat)} </h5>
            <div class='bar' style="--value:${porcent_stats}%;" > </div>
        `;
        base_stats.appendChild(barra);
    });

    document.getElementById('total_stats').innerText = soma_total;
}

carregarPokemon();