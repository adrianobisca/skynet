
var ColecaoFilmes = function () {
    this.response = {};
}

ColecaoFilmes.prototype.makeRequest = function () {
    var Url = "https://sky-frontend.herokuapp.com/movies";
    var self = this;

    $.getJSON(Url, function (data) {
        self.response = data;
        self.publishers(this.response);
    });
}

ColecaoFilmes.prototype.getResponse = function () {
    return this.response;
}

ColecaoFilmes.prototype.publishers = function (response) {
    $.Topic("movies-requested").publish(response);
}

