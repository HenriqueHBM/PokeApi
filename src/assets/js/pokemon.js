import { first_letter_up } from '/src/app.js';
import { cut_url_id } from '/src/app.js';
import { formata_index } from '/src/app.js';
import { getParamUrl } from '/src/app.js';

async function info_pokemon(id){
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp => resp.json());
}


async function carregarPokemon(){
    const id_pokemon = getParamUrl('id');
    const pokemon = await info_pokemon(id_pokemon);
    
    document.getElementById('pokemon-nome').innerText = first_letter_up(pokemon.name);
    document.getElementById('pokemon_numero').innerText = "#"+formata_index(id_pokemon);
    document.getElementById('pokemon-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id_pokemon}.png`
    

    formata_tipos(pokemon.types);
    const descricao = await info_descricao(id_pokemon);
    console.log(descricao);
    
    document.getElementById('pokemon_descricao').innerText = (descricao.flavor_text.replace(/[\n\f]/g, " "));
    
    habilidades(pokemon.abilities);
    base_statics(pokemon.stats);

    constroi_evolucoes(id_pokemon);
}

function formata_tipos(tipos){
    const lista_tipos = document.getElementById('pokemon_tipos');
    tipos.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('tipo_container');
        div.innerHTML = `
            <span class="tipo" style="background: var(--${element.type.name}-c); border-color:var(--${element.type.name}-b)">
                <img src='/public/icons/icons_tipo/${element.type.name}.svg' width='35rem' height='35rem' class='img_icon_tipo' />
                <span class='text_tipo_pokemon'>${first_letter_up(element.type.name)}</span>
            </span>
        `;
        lista_tipos.appendChild(div)
    });
}

async function info_descricao(id){
    const especies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const dados = await especies.json();
    return dados.flavor_text_entries.find(entry => entry.language.name === "en");
}

function base_statics(stats){
    const base_stats = document.getElementById('base_stats');
    let soma_total = 0;
    stats.forEach(element => {
        let style_cor_barra = cor_barra(element.base_stat);
        soma_total += element.base_stat;
        
        const barra = document.createElement('div');
        barra.classList.add('container-base-static');
        barra.innerHTML = `
            <h5 style='width:25%; text-align: end; '   class='name_stats'> ${first_letter_up(element.stat.name)} </h5>
            <h5 style='width:8%;  text-align: center;' class='name_stats'> ${(element.base_stat)} </h5>
            <div class='bar' style="${style_cor_barra}" > </div>
        `;
        base_stats.appendChild(barra);
    });

    document.getElementById('total_stats').innerText = soma_total;
}


function cor_barra(valor){
    let porcent_stats = (valor * 100) / 255;
    switch(true){
        case valor < 60:
            return `--value:${porcent_stats}%; --color:#cc4d12dc`;
        case valor < 90 :
            return `--value:${porcent_stats}%; --color:#c9c500c9`;
        case valor < 120 :
            return `--value:${porcent_stats}%; --color:#00c853`; 
        case valor < 150 :
            return `--value:${porcent_stats}%; --color:#097034d2`; 
        case valor < 255 :
            return `--value:${porcent_stats}%; --color:#1378cadc`;
    }
}

async function habilidades(abilits){
    const abilit = document.getElementById('pokemon_habilidades');
    for (const element of abilits) {
        let li = document.createElement('li');
        li.innerText = first_letter_up(element.ability.name);
        li.title = await descricao_habilidade(element.ability.url);
        li.classList.add('habilidade_text')
        abilit.appendChild(li);
        
    }
}

async function descricao_habilidade(url){
    const effects = await fetch(url);
    const dados = await effects.json();

    return dados.effect_entries.find(
        entry => entry.language.name === "en"
    ).effect;    
}

async function getEvolutions(id_pokemon) {
    const especies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id_pokemon}`);
    const dados = await especies.json();

    const evolucoes = await fetch(dados.evolution_chain.url);
    const evolucoes_data = await evolucoes.json();

    let evolutions = [];

    function lista_evo(evo){
        evolutions.push(cut_url_id(evo.species.url, 'pokemon-species/'));
        
        evo.evolves_to.forEach(prox => {
            lista_evo(prox);
        });
    }

    lista_evo(evolucoes_data.chain)    
    return evolutions;
}

async function constroi_evolucoes(id_pokemon){
    const dados = await getEvolutions(id_pokemon);
    const lista = document.getElementById('linha-evolucao');

    let contador = 1;
    for (const element of dados) {
        const pokemon = await info_pokemon(element);
        const div = document.createElement('div');
        div.classList.add('evolution-component');
        div.innerHTML = `
            <a href='/src/views/pokemon.html?id=${element}'>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element}.png" width='150rem' alt="evolucao${contador}" onerror="this.src='/public/images/img_nao_carregada.png';">
                <div class='text-evolutions'>
                    <p>#${formata_index(element)}</p>
                    <p>${first_letter_up(pokemon.name)}</p>
                </div>
            </a>
        `;
        lista.appendChild(div);
        if(dados.length > contador){
            const span = document.createElement('span');
            span.innerText = '→';
            span.classList.add('seta');
            lista.appendChild(span);
        }
        contador++;
    }
}

function verifica_click(){
    const salvar_bnt = document.getElementById('salvar-btn');
    let id_pokemon;
    salvar_bnt.addEventListener('click', () => {
        toggle_btn_salvar(getParamUrl('id'))
    });

    return id_pokemon;
}

async function toggle_btn_salvar(id_pokemon, not_toggle = null){
    let lista_salvos = JSON.parse(localStorage.getItem("salvo"));
    const icon_salvar = document.getElementById('icon_btn_salvar');
    const pokemon = await info_pokemon(id_pokemon);

    if(lista_salvos.find(element => element.id == id_pokemon)){
        icon_salvar.src = '/public/icons/save_filled.png';
        lista_salvos = lista_salvos.filter(element => element.id != id_pokemon)
    }else{
        icon_salvar.src = '/public/icons/save_outline.png';
        lista_salvos.push({
            "id" : id_pokemon,
            "image": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id_pokemon}.png`,
            "name": pokemon.name
        })
    }
    
    if(not_toggle == null){
        localStorage.setItem("salvo", JSON.stringify(lista_salvos));
        window.location.reload();
    }
}

function document_ready(){
    toggle_btn_salvar(getParamUrl('id'), 1);
}

document_ready();
carregarPokemon();
verifica_click();