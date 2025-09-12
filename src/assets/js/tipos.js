async function tiposPoke(){
    // pegar a regiao
    const resposta = await fetch("https://pokeapi.co/api/v2/type/");
    const dados = await resposta.json();
    return dados;
}

async function carregarTemplateTipos(){
    const tipos = await tiposPoke();
    const lista = document.getElementById("tipo-list");
    
    tipos.results.forEach(tipo_poke => {
        let div_tipo = document.createElement('div');
        div_tipo.innerText = tipo_poke.name;
        lista.append(div_tipo);
    });
}

carregarTemplateTipos();