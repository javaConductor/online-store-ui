define("app",
  ["jquery", 'routes/appRouter', "backbone"],
  function ($, Router, Backbone ) {
    console.log("creating app: Router: "+Router+ " backbone:"+Backbone+ " $:"+$);
    var router = new Router({});
    router.on('route:main', function(actions) {
      alert(actions);
    });

// Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    var self;
    var obj = {
      start: function(){
      }
    };

    self = obj;
    return obj;
  }
);
