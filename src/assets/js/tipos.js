//export para poder usar em outros scripts
export async function tiposPoke() {
    // pegar a regiao
    const resposta = await fetch("https://pokeapi.co/api/v2/type/");
    const dados = await resposta.json();
    //removendo os typos[desconhechido, sombra e stellar]
    const tiposValidos = dados.results.filter(
        t => !["unknown", "shadow", 'stellar'].includes(t.name)
    );
    return tiposValidos;
}

async function retornaUrlPokedexRegiao(regiao) {
    const resp = await fetch(`https://pokeapi.co/api/v2/region/${regiao}`);
    const dados = await resp.json();
    return dados.pokedexes[0].url; // pega a primeira pokédex da região, ou primeira url da pokedex da regiao
}

async function listarPokemonsDaRegiao(url) {
    const resp = await fetch(url);
    const dados = await resp.json();

    //tratamento das informacoes para retornar apenas o id e nome do pokemon
    return dados.pokemon_entries.map(dado => {
        //cortando a url de dentro da pokedex do pokemon para pegar apenas o id do mesmo
        const id = dado.pokemon_species.url.split('pokemon-species/')[1].slice(0, -1);
        return { id, name: dado.pokemon_species.name };
    });
}

async function listarPokemonsDoTipo(tipo) {
    const resp = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const dados = await resp.json();

    return dados.pokemon.map(p => {
        //cortando a url do pokemon para pegar apenas o id do mesmo
        const id = p.pokemon.url.split('pokemon/')[1].slice(0, -1);
        return { id, name: p.pokemon.name };
    });
}

export async function listarPokemonRegiaoTipo(tipo, regiao) {
    // Retorna a url da pokedex da regiao
    const urlPokedex = await retornaUrlPokedexRegiao(regiao);
    //com base na pokedex, retorna o id e nome do pokemon com base na regiao
    const pokemonsRegiao = await listarPokemonsDaRegiao(urlPokedex);
    //  Busca lista de pokémons pelo tipo dele
    const pokemonsTipo = await listarPokemonsDoTipo(tipo);
    //  Faz interseção das listas (região ∩ tipo)
    const idsTipo = new Set(pokemonsTipo.map(p => p.id));
    //filtra os pokemons da regiao pelo tipo de cada, tipo: se na regiao tem o id do pokemon de certo tipo, pega esse pokemon
    return pokemonsRegiao.filter(p => idsTipo.has(p.id));
}
