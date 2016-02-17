define("app",
  ["jquery", 'routes/appRouter', "backbone","services/productService",
  "views/categoryMenuView"],
  function ($, Router, Backbone, productService, MenuView ) {
    console.log("creating app: Router: "+Router+ " productService:"+productService+ " $:"+$);
    var router = new Router({});
    router.on('route:main', function(actions) {
      alert(actions);
    });

// Start Backbone history - a necessary step for bookmarkable URL's
    Backbone.history.start();
    var self;
    var obj = {
      start: function(selector){
        var $parent = $(selector);
        var menuView = new MenuView({
          targetSelector : selector
        });
      }
    };

    self = obj;
    return obj;
  }
);
