/**
 * Created by lcollins on 1/1/2016.
 */
define("routes/appRouter",
  ["backbone", "services/productService", "views/productView",
    "services/messageService", 'services/categoryService',
    'views/categoryProductView', 'services/cartService'],
  function (Backbone, productService,
            ProductView, messageService,
            categoryService, CategoryProductView, cartService) {
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
        cartService.createCartView($('#main'), cartService.userCart());
      },

      showCategoryProductList: function (categoryId) {
        var category
        categoryService.getCategory(categoryId).then(function (cat) {
          category = cat;
          return productService.getProductsForCategory(categoryId).then(function (productIdList) {
            $('#main').empty();
            var v = new CategoryProductView({targetSelector: '#main', category: category});
            v.render();
          });
        });
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

    var self = appRouter;
    return appRouter;
  });
