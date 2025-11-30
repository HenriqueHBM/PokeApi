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

export function formata_index(id){
        switch (true){
                case id < 10:
                        return `00${id}`;
                
                case id < 99:
                        return `0${id}`;
                default:
                        return id;
        }
}

export function cut_url_id(url, param){
        return url.split(param)[1].slice(0, -1);
}

export function getParamUrl(param){
        const params = new URLSearchParams(document.location.search);
        return params.get(param);
}