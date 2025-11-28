import { pesquisar_pokemon } from '/src/assets/js/header.js';

fetch("/src/views/layouts/header.html")
        .then(res => res.text())
        .then( function(data){
                document.getElementById('extends-header').innerHTML = data;
                pesquisar_pokemon();
        } );

fetch("/src/views/layouts/footer.html")
        .then(res => res.text())
        .then(data => document.getElementById('extends-footer').innerHTML = data);

export function first_letter_up(text){
        return  text.slice(0, 1).toUpperCase() + text.slice(1);
} 