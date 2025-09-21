


const regioes = [
    {id: 1, regiao: 'Kanto'},
    {id: 2, regiao: 'Johto'},
    {id: 3, regiao: 'Honn'}
]


const listar_regioes = JSON.stringify(regioes);
const listar_regioes_parse = JSON.parse(listar_regioes);

console.log(listar_regioes);
console.log(listar_regioes_parse);