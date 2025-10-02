async function regioes(){
    const resposta = await fetch("https://pokeapi.co/api/v2/region/");
    const dados = await resposta.json();
    return dados;
}

async function carregarTemplatesRegioes() {
    const dados = await regioes();
    const lista = document.getElementById("region-list");

    let x = 1;
    dados.results.forEach(regiao => {
        //container das regioes
        let div_container = document.createElement('a');
        div_container.href = `/src/views/pokedex.html?regiao=${regiao.name}`;
        lista.append(div_container);

        let div_text = document.createElement('div');
        div_text.classList.add("text-container");
        div_text.textContent = regiao.name;
        
        div_container.classList.add('container_regiao');
        div_container.id = `${regiao.name}`;

        let div_img = document.createElement('div');
        div_img.classList.add("img-container");

        if(x % 2){
            div_container.classList.add('bg-color-black');
            div_container.append(div_text);
            div_container.append(div_img)
        }else{
            div_container.classList.add('bg-color-white');
            div_container.append(div_img)
            div_container.append(div_text);
        }
        x++;
    });
}


async function selectRegioes(){
    const dados = await regioes();
    let lista = document.getElementById("select-region");

    dados.results.forEach(regiao => {
        let div_text = document.createElement('a');
        div_text.textContent = regiao.name.toUpperCase();
        div_text.href =`#${regiao.name}`;
        div_text.classList.add("text-link-region");
        lista.append(div_text);
    });
}

carregarTemplatesRegioes();
selectRegioes();

/*
const regioes = [
    {id: 1, regiao: 'Kanto'},
    {id: 2, regiao: 'Johto'},
    {id: 3, regiao: 'Honn'}
]


const listar_regioes = JSON.stringify(regioes);
const listar_regioes_parse = JSON.parse(listar_regioes);

console.log(listar_regioes);
console.log(listar_regioes_parse);

*/