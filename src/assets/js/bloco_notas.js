const bloco_de_notas = [{
    numeracao:'025',  nome: 'Pikachu',  salvar: 1
}];


const listar_notas = JSON.stringify(bloco_de_notas);
const listar_notas_parse = JSON.parse(listar_notas);

console.log(listar_notas);
console.log(listar_notas_parse);