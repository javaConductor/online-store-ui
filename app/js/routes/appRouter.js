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
        "category/:categoryId/products": "showCategoryProductList",   // #search/kiwis/p7
        "cart": "showCart",   // #search/kiwis/p7
        "*main": "main"
      },

      main: function () {
        alert("route: main");
      },

      showCart: function showCart () {
        alert("route: cart");

        $("#main").empty();
        $("#main").append("<a href='javascript:;' class='simpleCart_checkout'>-------------------------------</a>");
      },

      showCategoryProductList: function (categoryId) {
        productService.getProductsForCategory(categoryId).then(function( productIdList  ){
          productService.createProductList( productIdList )
        })
      },

      showProductDetail: function (productId) {

        productService.getProduct(productId).then(
          function (product) {
            /// add the product to the template
            $("#main").empty();
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
