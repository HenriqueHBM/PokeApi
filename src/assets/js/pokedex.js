//Importanto as funcoes do outro arquivo js
import { tiposPoke } from "./tipos.js"
import { listarPokemonRegiaoTipo } from "./tipos.js";

const PAGE_SIZE = (window.screen.width >= 600) ? 4 : 1;

async function carregarTemplateTipos() {
    const tipos = await tiposPoke();
    const lista = document.getElementById("tipo-list");

    for (const tipo_poke of tipos) {
        //declarando uma variavel que esta recebendo a regiao pela url do navegador
        const params = new URLSearchParams(document.location.search);
        const regiao = params.get("regiao");

        //declarando variaveis que estao recebendo uma div
        const div_container_tipo = document.createElement('div');
        div_container_tipo.classList.add('container_tipo');

        let page = 0;
        //lista dos pokemons filtrada pela regiao, e o tipo
        const lista_pokemons = await listarPokemonRegiaoTipo(tipo_poke.name, regiao);
        const total_pagina = Math.max(1, Math.ceil(lista_pokemons.length / PAGE_SIZE));

        //construcao do container das separacoes por tipo de pokemon
        div_container_tipo.innerHTML = `
            <div class='header_tipo header_cor_tipo_${tipo_poke.name}'> 
                <button class='btn_prev btn_card' id='btn_prev_${tipo_poke.name}'> 
                    <img src='/public/icons/prev_icon.png' class='icon_btn_card' />
                </button>
                <div class='div_text_type'>
                    <div class='icon_tipo'>    
                        <img src='/public/icons/icons_tipo/${tipo_poke.name}.svg' width='35rem' height='35rem' class='img_icon_tipo' />
                    </div>
                    <div class='text_tipo'>${tipo_poke.name} </div>
                </div>
                <button  class='btn_next btn_card' id='btn_next_${tipo_poke.name}'> 
                    <img src='/public/icons/next_icon.png' class='icon_btn_card' />
                </button>
            </div>
            <div class='body_tipo body_cor_tipo_${tipo_poke.name}' id='body_tipo_${tipo_poke.name}'> 

            </div>
            <div class='footer-tipo header_cor_tipo_${tipo_poke.name}'> 
                <span id='prev_pagination_${tipo_poke.name}'> ${page + 1 } </span>
                <span>de</span>
                <span id='next_pagination_${tipo_poke.name}'> ${total_pagina} </span>
            </div>
        `;
        
        function carregarCards(){
            const ini = page * PAGE_SIZE; // 0
            const fim = ini + PAGE_SIZE;  // 4
            const limit_pokemon_carrossel = lista_pokemons.slice(ini, fim); // lista dos pokemons sendo cortada, ini e fim das qtde a mostrar

            const card_pokemon = document.getElementById(`body_tipo_${tipo_poke.name}`);
            //limpando caso ja tenha cards carregados
            card_pokemon.innerHTML = "";

            if(limit_pokemon_carrossel.length == 0){
                const div_card_vazio = document.createElement('div');
                div_card_vazio.classList.add("card_tipo_vazio");
                div_card_vazio.innerText = "SEM POKÉMON'S DESSA REGIÃO E TIPO"
                card_pokemon.append(div_card_vazio);
            }else{
                limit_pokemon_carrossel.forEach(poke => {
                    const card_a = document.createElement("a");
                    card_a.classList.add("card_pokemon", `card_cor_tipo_${tipo_poke.name}`);
                    card_a.href = `/src/views/pokemon.html?id=${poke.id}`;
                    card_a.innerHTML = `
                        <div class='link-card-img'>
                            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png' width='100%' height='100%' style='border-radius: 20px' onerror="this.src='/public/images/img_nao_carregada.png';" />
                        </div>
                        <div class='link-card'>
                            <span class='text-link-card'><b>#${poke.id}</b></span> <br>
                            <span class='text-link-card'>${poke.name}</span>
                        </div>
                    `;
                    card_pokemon.appendChild(card_a);
                });
            }
            btn_prev.disabled = page == 0; // caso contador esteja com 0 disabilita o botao
            btn_next.disabled = page >= total_pagina - 1; // caso o total por pagina tenha menos que o contador, desabilita o botao
        }

        //append dessas variaveis
        lista.append(div_container_tipo);

        //apos carregar os cards na tela, inicializa as variaveis onde tiver tal id
        const btn_prev = document.getElementById(`btn_prev_${tipo_poke.name}`);
        const btn_next = document.getElementById(`btn_next_${tipo_poke.name}`);
        carregarCards(); // inicializando a primeira vez

        btn_prev.addEventListener("click", () => { 
            // caso o contador(no caso), tenha mais que 0, deixa subtrair
            if(page > 0){
                page--;
                //refaz os cards dentro do container
                carregarCards();
                document.getElementById(`prev_pagination_${tipo_poke.name}`).innerText = page + 1;
            }
        });

        btn_next.addEventListener("click", () => {
            if(page <= total_pagina){ // caso o contador seja meno que a quantidade, deixa acrescentar 
                page++;
                carregarCards();
                document.getElementById(`prev_pagination_${tipo_poke.name}`).innerText = page + 1;
            }
        });
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