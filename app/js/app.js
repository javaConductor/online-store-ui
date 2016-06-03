define("app",
  ["jquery", 'routes/appRouter', "backbone","services/productService",
    "views/categoryMenuView",
    "views/categoryProductView"
  ],
  function ($, Router, Backbone, productService, MenuView, ProductView) {
    console.log("creating app: Router: "+Router+ " productService:"+productService+ " $:"+$);
    var router = new Router({});
    // router.on('route:main', function(actions) {
    //   //alert(actions);
    // });

    $.subscribe("/category/select", function (e, category) {
      self.category = category;
      console.log("Got " + e + " message w category: " + JSON.stringify(category));
      console.log("Rendering view " + $(self.targetSelector));
      router.navigate("category/" + category.id + "/products", {trigger: true, replace: true});
    });

// Start Backbone history - a necessary step for bookmarkable URL's
    Backbone.history.start();
    var self;
    var obj = {
      start: function (menuSelector, mainSelector) {
        new MenuView({
          targetSelector: menuSelector
        });
        new ProductView({
          targetSelector: mainSelector
        });
      }
    };

    console.log("created app: " + obj);
    window.app = obj;
    self = obj;
    return obj;
  }
);
