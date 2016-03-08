define("app",
  ["jquery", 'routes/appRouter', "backbone","services/productService",
    "views/categoryMenuView",
    "views/categoryProductView"
  ],
  function ($, Router, Backbone, productService, MenuView, ProductView) {
    console.log("creating app: Router: "+Router+ " productService:"+productService+ " $:"+$);
    var router = new Router({});
    router.on('route:main', function(actions) {
      alert(actions);
    });

// Start Backbone history - a necessary step for bookmarkable URL's
    Backbone.history.start();
    var self;
    var obj = {
      start: function (menuSelector, mainSelector) {
        var $parent = $(menuSelector);
        var menuView = new MenuView({
          targetSelector: menuSelector
        });
        var mainView = new ProductView({
          targetSelector: mainSelector
        });
      }
    };

    self = obj;
    return obj;
  }
);
