async function regioes(){
    const resposta = await fetch("https://pokeapi.co/api/v2/region/");
    const dados = await resposta.json();
    return dados;
}

async function txt_regiao(regiao) {
    const response = await fetch(`/src/assets/txt/${regiao}.txt`);
    const text = await response.text();
    return text;
}

async function carregarTemplatesRegioes() {
    const dados = await regioes();

    dados.results.forEach(regiao => {
        const lista = document.getElementById("region-list");
        criarCard(regiao, lista)
    });
}

async function criarCard(regiao, lista){
    const div = document.createElement("div");
    const descricao = await txt_regiao(regiao.name);
        
    div.innerHTML = `
        <a href='/src/views/pokedex.html?regiao=${regiao.name}' class='card-regiao' id='${regiao.name}' > 
            <div class='img-container-card-regiao'>
                <img src='/public/images/new/${regiao.name}.png'  alt='Sem Imagem' class='img-card-regiao' />
            </div>
            <div class='text-container-card-regiao'>
                <p class='title-card-regiao' ><b>${regiao.name}</b></p>
                <p class='description-card-regiao'>
                    ${descricao}
                </p>
            </div>
        </a>
    `;

    div.classList.add('div_card_regiao')
    lista.append(div);
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