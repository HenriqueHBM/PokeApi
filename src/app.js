fetch("src/views/layouts/appHeader.html")
.then( res => res.text())
        .then(data => document.getElementById('extends-header').innerHTML = data);

fetch("src/views/layouts/appFooter.html")
.then( res => res.text())
        .then(data => document.getElementById('extends-footer').innerHTML = data);