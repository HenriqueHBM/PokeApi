const pokemon = {
    numeracao:'025',  nome: 'Pikachu', descricao: 'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.',
    detalhes: 'Pikachu are small, and cute mouse-like Pokémon. They are almost completely covered by yellow fur. They have long yellow ears that are tipped with black.',
    tipos: [{tipo : 'elétrico'}], evolucoes: [{evo:'Raichu'}], pre_evolucao:[{pre: 'Pichu'}],
    salvar: 0 // boolean(0 => false, 1 => true)
}

const listar_pokemon = JSON.stringify(pokemon);
const listar_pokemon_parse = JSON.parse(listar_pokemon);

console.log(listar_pokemon);
console.log(listar_pokemon_parse);
