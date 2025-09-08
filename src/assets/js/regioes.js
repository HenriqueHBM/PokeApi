async function carregarRegioes() {
    const resposta = await fetch("https://pokeapi.co/api/v2/region/");
    const dados = await resposta.json();
    const lista = document.getElementById("region-list");

    dados.results.forEach(regiao => {
        let li = document.createElement('li');
        li.textContent = regiao.name.toUpperCase();
        lista.append(li);
    });
}

carregarRegioes();