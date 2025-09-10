fetch("src/views/layouts/header.html")
        .then(res => res.text())
        .then(data => document.getElementById('extends-header').innerHTML = data);

fetch("src/views/layouts/footer.html")
        .then(res => res.text())
        .then(data => document.getElementById('extends-footer').innerHTML = data);