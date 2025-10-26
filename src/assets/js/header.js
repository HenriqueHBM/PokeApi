async function lista_todos_pokemons(){
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
    const dados = resposta.json();
    return dados;
}

async function filtra_lista(pesquisa, lista_pesquisar){
    let lista_pokemons = [];
    lista_pokemons = await lista_todos_pokemons();
    //filtrando com base na lista dos pokemons onde incluir tal parte da escrita
    lista_pokemons = lista_pokemons.results.filter(p => p.name.includes(pesquisa) && !p.name.includes('-'))

    lista_pokemons.forEach(element => {
        let id = element.url.split('pokemon/')[1].slice(0, -1);
        lista_pesquisar.innerHTML += `
            <li><a class='link_pokemon' href='/src/views/pokemon.html?id=${id}'> ${element.name}</a></li>
        `;
    });
}


export async function pesquisar_pokemon(){
    const input_search = document.getElementById("pesquisar");
    const lista_pesquisar = document.getElementById('lista_pesquisar');
    const body = document.querySelector('body');

    input_search.addEventListener('input', () => {
        //deixando a escria em minusculo e tirando espacamentos
        const dado_search = input_search.value.toLowerCase().trim();
        
        if(dado_search.length >= 3){
            lista_pesquisar.innerHTML = '';
            filtra_lista(dado_search, lista_pesquisar)
            //mostrando lista com os dados
            lista_pesquisar.style.visibility = 'visible';
        }else{
            lista_pesquisar.innerHTML = '';
            //escondendo a lista
            lista_pesquisar.style.visibility = 'hidden';
        }
    });

    // quando clicado em qualquer parte da pagina, ele esconde a lista
    body.addEventListener('click', () => {
        lista_pesquisar.innerHTML = '';
        lista_pesquisar.style.visibility = 'hidden';
    })
}
