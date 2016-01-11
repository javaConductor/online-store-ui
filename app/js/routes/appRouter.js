/**
 * Created by lcollins on 1/1/2016.
 */
define("routes/appRouter",
  ["backbone", "services/productService", "views/productView", "services/messageService"],
  function (Backbone, productService, ProductView, messageService) {
    console.log("creating appRouter");

    var appRouter = Backbone.Router.extend({

      routes: {
        "product/:id": "showProductDetail",   // #search/kiwis/p7
        "*main": "main"
      },

      main: function () {
        alert("route: main")
      },
      showProductDetail: function (productId) {

        $("#main").empty();
        productService.getProduct(productId).then(
          function (product) {
            /// add the product to the template
            productService.createProductDetailView($("#main"), product).then(function(v){
              v.render();
            });
          },
          function (err) {
            messageService.error("Could not find product: "+ productId+": "+err);
            console.error("Could not find product: "+ productId+": "+err);
          });
      },
      search: function (query, page) {
      }
    });

    return appRouter;
  });
