
function pesquisar_pokemon(){
    setTimeout(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        .then(res => res.json())
        .then(data => {
            const options = data.results.map(pokemon => ({
                id: pokemon.url.split('pokemon/')[1].slice(0, -1),
                title: pokemon.name
            }));
            
            new TomSelect('#pesquisar',{
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                sortField: 'title',
                options: options,
                create: false
            });
        });
        
    }, 20);
}

pesquisar_pokemon();