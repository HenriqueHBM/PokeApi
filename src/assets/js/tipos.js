async function tiposPoke() {
    // pegar a regiao
    const resposta = await fetch("https://pokeapi.co/api/v2/type/");
    const dados = await resposta.json();
    //removendo os typos[desconhechido e sombra]
    const tiposValidos = dados.results.filter(
        t => !["unknown", "shadow"].includes(t.name)
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


async function carregarTemplateTipos() {
    const tipos = await tiposPoke();
    const lista = document.getElementById("tipo-list");

    for (const tipo_poke of tipos) {
        //declarando uma variavel que esta recebendo a regiao pela url do navegador
        let params = new URLSearchParams(document.location.search);
        let regiao = params.get("regiao");

        //console.log(await listarPokemonRegiaoTipo(tipo_poke.name));

        //declarando variaveis que estao recebendo uma div
        let div_container_tipo = document.createElement('div');
        let div_header_tipo = document.createElement('div');
        let div_body_tipo = document.createElement("div");


        //passando uma classe para essas variaveis
        div_header_tipo.classList.add("header_tipo");
        div_container_tipo.classList.add('container_tipo');
        div_body_tipo.classList.add("body_tipo");

        //setando um texto para essas variaveis
        div_header_tipo.innerText = tipo_poke.name;

        const lista_pokemons = await listarPokemonRegiaoTipo(tipo_poke.name, regiao);
        lista_pokemons.forEach(poke => {
            div_body_tipo.innerHTML += `
                <a class='card_pokemon' href='/src/views/pokemon.html?id=${poke.id}'>
                    <div>
                        <img src='/public/images/pikachu.webp' width='100%' style='border-radius: 20px' />
                    </div>
                    <div class='link-card'>
                        ${poke.name}
                    </div>
                </a>`
        })
        if (lista_pokemons.length == 0) {
            let div_card_vazio = document.createElement('div');
            div_card_vazio.classList.add("card_tipo_vazio");
            div_card_vazio.innerText = "SEM POKÉMON'S DESSE TIPO E REGIÃO"
            div_body_tipo.append(div_card_vazio);
        }

        //append dessas variaveis
        lista.append(div_container_tipo);
        div_container_tipo.append(div_header_tipo);
        div_container_tipo.append(div_body_tipo);
    };
}

carregarTemplateTipos();


const regioes_tipos = [
    {
        id: 1, regiao: 'Kanto', tipo: [
            {
                tipo_poke: 'inseto', pokemons: [
                    { nome: 'Caterpie', numero: '010' }
                ]
            }
        ]
    },
    {
        id: 2, regiao: 'Johto', tipo: [
            {
                tipo_poke: 'inseto', pokemons: [
                    { nome: 'Caterpie', numero: '010' }
                ]
            }
        ]
    }
]

/*
const listar_regioes = JSON.stringify(regioes_tipos);
const listar_regioes_parse = JSON.parse(listar_regioes);

console.log(listar_regioes);
console.log(listar_regioes_parse);
*/