$(function () {
    
    var topics = {};
 
    jQuery.Topic = function( id ) {
      var callbacks, method,
        topic = id && topics[ id ];
     
      if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
          publish: callbacks.fire,
          subscribe: callbacks.add,
          unsubscribe: callbacks.remove
        };
        if ( id ) {
          topics[ id ] = topic;
        }
      }
      return topic;
    };

    var colecaoFilmes = new ColecaoFilmes();
    colecaoFilmes.makeRequest();

    var colecaoFilmesOrganizados = new ColecaoFilmesOrganizados(colecaoFilmes);
    colecaoFilmesOrganizados.subscribers();

    var colecaoHighlights = new ColecaoHighlights(colecaoFilmes);
    colecaoHighlights.subscribers();

});
