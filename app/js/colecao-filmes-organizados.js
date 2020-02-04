
var ColecaoFilmesOrganizados = function (colecaoFilmes) {
    this.colecaoFilmes = colecaoFilmes;
    // Guardar os filmes
    this.filmesOrganizados = [];
};


ColecaoFilmesOrganizados.prototype.add = function (filme) {

    this.filmesOrganizados.push(filme);
}

ColecaoFilmesOrganizados.prototype.getAll = function () {
    return this.filmesOrganizados;
}

ColecaoFilmesOrganizados.prototype.subscribers = function () {
    const self = this;

    $.Topic("movies-requested").subscribe(function (response) {
        self.render();
    });

}

ColecaoFilmesOrganizados.prototype.render = function () {

    var self = this;
    var response = this.colecaoFilmes.getResponse();
    var listaFilmes = response[2].movies;


    var $comedia = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Comédia");
    });
    self.add({ "Comédia": $comedia });

    var $acaoAventura = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Ação e Aventura");
    });
    self.add({ "Ação e Aventura": $acaoAventura });

    var $infantil = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Infantil");
    });
    self.add({ "Infantil": $infantil });

    var $animacao = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Animação");
    });
    self.add({ "Animação": $animacao });

    var $fantasia = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Fantasia");
    });
    self.add({ "Fantasia": $fantasia });

    var $suspense = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Suspense");
    });
    self.add({ "Suspense": $suspense });

    var $terror = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Terror");
    });
    self.add({ "Terror": $terror });

    var $drama = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Drama");
    });
    self.add({ "Drama": $drama });

    var $ficcao = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Ficção Científica");
    });
    self.add({ "Ficção Científica": $ficcao });

    var $biografia = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Biografia");
    });
    self.add({ "Biografia": $biografia });

    var $musical = listaFilmes.filter(function (movie) {
        return movie.categories.includes("Musical");
    });
    self.add({ "Musical": $musical });


    console.log(this.filmesOrganizados);

    $.each(this.filmesOrganizados, function (k, v) {
        // categorias
        $("#listaFilmes").append(
            `<div class="w-100">
                <p class="font-weight-bold">`+ Object.keys(v) + `</p>
                <div class="filmes-` + k + ` row mb-3"></div>
                </div>`
        );
        // filmes por categoria
        $.each(Object.values(v), function () {
            $.each(this, function (index, filme) {
                $(`.filmes-` + k + ``).append(
                    `<div class="col-2 my-2">
                            <div class="p-1" style="position:relative;">
                                <img class="d-block w-100 rounded" src="` + filme.images[0].url + `" alt=` + filme.title + `">
                                    <span class="fa-stack" style="position: absolute; top: 10px; right: 10px;">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fas `+ (filme.isBlocked ? `fa-lock` : `fa-shopping-cart`) + ` fa-stack-1x fa-inverse"></i>
                                    </span>
                            </div>
                        </div>`
                );
            })
        })
    })

}
