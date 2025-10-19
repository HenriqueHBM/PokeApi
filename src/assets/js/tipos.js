async function tiposPoke() {
    // pegar a regiao
    const resposta = await fetch("https://pokeapi.co/api/v2/type/");
    const dados = await resposta.json();
    //removendo os typos[desconhechido, sombra e stellar]
    const tiposValidos = dados.results.filter(
        t => !["unknown", "shadow", 'stellar'].includes(t.name)
    );
    return tiposValidos;
}

async function listagemRegioes(regiao) {
    const resp = await fetch(`https://pokeapi.co/api/v2/region/${regiao}`);
    const dados = await resp.json();
    return dados.pokedexes[0].url; // pega a primeira pokédex da região
}

async function listarPokemonsDaRegiao(url) {
    const resp = await fetch(url);
    const dados = await resp.json();

    return dados.pokemon_entries.map(dado => {
        const id = dado.pokemon_species.url.split('pokemon-species/')[1].slice(0, -1);
        return { id, name: dado.pokemon_species.name };
    });
}

async function listarPokemonsDoTipo(tipo) {
    const resp = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const dados = await resp.json();

    return dados.pokemon.map(p => {
        const id = p.pokemon.url.split('pokemon/')[1].slice(0, -1);
        return { id, name: p.pokemon.name };
    });
}

async function listarPokemonRegiaoTipo(tipo, regiao) {
    // Busca lista de pokémons da região
    const urlPokedex = await listagemRegioes(regiao);
    const pokemonsRegiao = await listarPokemonsDaRegiao(urlPokedex);

    //  Busca lista de pokémons do tipo
    const pokemonsTipo = await listarPokemonsDoTipo(tipo);

    //  Faz interseção das listas (região ∩ tipo)
    const idsTipo = new Set(pokemonsTipo.map(p => p.id));

    return pokemonsRegiao.filter(p => idsTipo.has(p.id));
}

const PAGE_SIZE = 4;
async function carregarTemplateTipos() {
    const tipos = await tiposPoke();
    const lista = document.getElementById("tipo-list");

    for (const tipo_poke of tipos) {
        //declarando uma variavel que esta recebendo a regiao pela url do navegador
        const params = new URLSearchParams(document.location.search);
        const regiao = params.get("regiao");

        //console.log(await listarPokemonRegiaoTipo(tipo_poke.name));

        //declarando variaveis que estao recebendo uma div
        const div_container_tipo = document.createElement('div');
        const div_header_tipo = document.createElement('div');
        const div_body_tipo = document.createElement("div");
        const btn_prev = document.createElement('button');
        const btn_next = document.createElement("button");


        //passando uma classe para essas variaveis
        div_container_tipo.classList.add('container_tipo');
        div_header_tipo.classList.add("header_tipo", `header_cor_tipo_${tipo_poke.name}`);
        div_body_tipo.classList.add("body_tipo", `body_cor_tipo_${tipo_poke.name}`);
        btn_prev.classList.add('btn_prev');
        btn_next.classList.add('btn_next');

        const img_prev = document.createElement('img');
        const img_next = document.createElement('img');
        const div_tipo_icon = document.createElement('div');

        img_prev.src = `/public/icons/prev_icon.png`;
        img_next.src = `/public/icons/next_icon.png`;

        img_prev.classList.add('icon_btn_card')
        img_next.classList.add('icon_btn_card')
        btn_prev.classList.add('btn_card');
        btn_next.classList.add('btn_card');
        div_tipo_icon.classList.add('div_text_type')

        btn_prev.appendChild(img_prev);
        btn_next.appendChild(img_next);

        div_tipo_icon.innerHTML = `
            <div class='icon_tipo'>    
                <img src='/public/icons/icons_tipo/${tipo_poke.name}.svg' width='35rem' height='35rem' class='img_icon_tipo' />
            </div>
            <div class='text_tipo'>${tipo_poke.name} <div>
        `;
        //setando um texto para essas variaveis
        div_header_tipo.append(btn_prev);
        div_header_tipo.appendChild(div_tipo_icon);
        div_header_tipo.append(btn_next);

        let page = 0;
        const lista_pokemons = await listarPokemonRegiaoTipo(tipo_poke.name, regiao);
        const total_pagina = Math.max(1, Math.ceil(lista_pokemons.length / PAGE_SIZE));

        function carregarCards(){
            const ini = page * PAGE_SIZE; // 0
            const fim = ini + PAGE_SIZE;  // 4
            const limit_pokemon_carrossel = lista_pokemons.slice(ini, fim); // lista dos pokemons sendo cortada, ini e fim das qtde a mostrar

            div_body_tipo.innerHTML = "";

            if(limit_pokemon_carrossel.length == 0){
                const div_card_vazio = document.createElement('div');
                div_card_vazio.classList.add("card_tipo_vazio");
                div_card_vazio.innerText = "SEM POKÉMON'S DESSE TIPO E REGIÃO"
                div_body_tipo.append(div_card_vazio);
            }else{
                limit_pokemon_carrossel.forEach(poke => {
                    const card_a = document.createElement("a");
                    card_a.classList.add("card_pokemon", `card_cor_tipo_${tipo_poke.name}`);
                    card_a.href = `/src/views/pokemon.html?id=${poke.id}`;
                    card_a.innerHTML = `
                        <div class='link-card-img'>
                            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png' width='100%' height='260rem' style='border-radius: 20px' />
                        </div>
                        <div class='link-card'>
                            <span class='text-link-card'><b>#${poke.id}</b></span> <br>
                            <span class='text-link-card'>${poke.name}</span>
                        </div>
                    `;
                    div_body_tipo.appendChild(card_a);
                });
            }
            btn_prev.disabled = page == 0; // caso contador esteja com 0 disabilita o botao
            btn_next.disabled = page >= total_pagina - 1; // caso o total por pagina tenha menos que o contador, desabilita o botao
        }

        btn_prev.addEventListener("click", () => { 
            // caso o contador(no caso), tenha mais que 0, deixa subtrair
            if(page > 0){
                page--;
                carregarCards();
            }
        });

        btn_next.addEventListener("click", () => {
            if(page <= total_pagina){ // caso o contador seja meno que a quantidade, deixa acrescentar 
                page++;
                carregarCards();
            }
        });

        //append dessas variaveis
        lista.append(div_container_tipo);
        div_container_tipo.append(div_header_tipo, div_body_tipo);
        carregarCards(); // inicializando a primeira vez
    };
}


//funcao que troca os pokemons com base no que tem na url e seta o select com o mesmo
function atualiza_select_regiao(){
    const select = document.getElementById('input_select_region');
    const params = new URLSearchParams(document.location.search);
    //setanto o select com a regiao da url
    select.value = params.get('regiao');
    //event para quando trocado a opcao no select
    select.addEventListener('change', function(e){
        //setando na url a nova regiao
        params.set('regiao', select.value);
        //atualiza de fato a url com os parametros
        window.location.search = params;
    })
}

atualiza_select_regiao();
carregarTemplateTipos();