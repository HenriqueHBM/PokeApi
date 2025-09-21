

const regioes_tipos = [
    {
        id: 1, regiao: 'Kanto', tipo: [
            {
                tipo_poke: 'inseto', pokemons: [
                    { nome: 'Caterpie', numero: '010' }
                ]
            }
        ]
    },
    {
        id: 2, regiao: 'Johto', tipo: [
            {
                tipo_poke: 'inseto', pokemons: [
                    { nome: 'Caterpie', numero: '010' }
                ]
            }
        ]
    }
]


const listar_regioes = JSON.stringify(regioes_tipos);
const listar_regioes_parse = JSON.parse(listar_regioes);

console.log(listar_regioes);
console.log(listar_regioes_parse);