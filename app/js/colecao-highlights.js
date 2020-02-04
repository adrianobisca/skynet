
var ColecaoHighlights = function (colecaoFilmes) {
    this.colecaoFilmes = colecaoFilmes;
    // Guardar os highlights
    this.highlights = [];
};

ColecaoHighlights.prototype.getAll = function () {
    return this.highlights;
}

ColecaoHighlights.prototype.subscribers = function () {
    const self = this;

    $.Topic("movies-requested").subscribe(function (response) {
        self.render();
    });

}

ColecaoHighlights.prototype.render = function () {
    var response = this.colecaoFilmes.getResponse();
    this.highlights = response[0].items;

    $.each(this.highlights, function (k, v) {
        $(".carousel-inner").append(
            `<div class="carousel-item">
                <img class="d-block w-100" src="` + v.images[0].url + `" alt="` + v.description + `">
                </div>`
        ).find('.carousel-item').first().addClass("active");
        $(".carousel-indicators").append(
            `<li data-target="#carouselExampleIndicators" data-slide-to=" ` + k + ` " class="carouselExampleIndicators"></li>`
        ).find('.carouselExampleIndicators').first().addClass("active");
    });

}

