/**
 * Created by lcollins on 1/1/2016.
 */
var defaultRouter = Backbone.Router.extend({

  routes: {
    "*main" : "main",
    "help": "help",    // #help
    "search/:query": "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  main: function(){

  },

  help: function () {
  },

  search: function (query, page) {
  }

});

define("defaultRouter", ["backbone"], function (Backbone) {
    return defaultRouter;
});
