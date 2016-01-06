/**
 * Created by lcollins on 1/1/2016.
 */
define("routes/appRouter",
  ["backbone", "services/productService", "views/productView"],
  function (Backbone, productService, ProductView) {
    console.log("creating appRouter");

    var appRouter = Backbone.Router.extend({

      routes: {
        "*main": "main",
        "product/:id": "showProductDetail"   // #search/kiwis/p7
      },

      main: function () {
        alert("route: main")
      },
      showProductDetail: function (productId) {

        $("#main").empty();
        productService.getProduct(productId).then(
          function (product) {

            /// add the product to the template
            $("#main").append(new ProductView({model: product}));
          },
          function (err) {

          });
      },
      search: function (query, page) {
      }
    });

    return appRouter;
  });
