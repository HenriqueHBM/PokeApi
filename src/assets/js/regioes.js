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
        let div_container = document.createElement('div');
        lista.append(div_container);

        let div_text = document.createElement('div');
        div_text.textContent = regiao.name.toUpperCase();
        
        div_container.classList.add('container_regiao');
        div_container.id = `${regiao.name}`;

        let div_img = document.createElement('div');

        if(x % 2){
            div_container.classList.add('bg-color-black');
            div_container.append(div_text);
            div_container.append(div_img)
        }else{
            div_container.classList.add('bg-color-white');
            div_container.append(div_img)
            div_container.append(div_text);
        }

        div_text.classList.add("text-container");
        div_img.classList.add("img-container");

        
        x++;
    });
}

carregarTemplatesRegioes();

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

selectRegioes();