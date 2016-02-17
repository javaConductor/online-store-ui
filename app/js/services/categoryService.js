/**
 * Created by lcollins on 1/3/2016.
 */
define("services/categoryService",
  ["model/productModel", "data",'q', "services/messageService","services/templateService","views/productView"],
  function (productModel, dataService, Q, messageService, templateService, ProductView) {
  var prefix = "http://" + window.location.hostname + ":8889/";
  console.log("creating ProductService productModel.Product:"+productModel.Product);

  var productCollection = new productModel.ProductCollection;
  productCollection.fetch();
  console.log("created ProductCollection");

    var obj =  {

      getCategoryTreecreateProductDetailView : function($parent, product){
        return templateService.getProductDetailTemplate().then(function(template){
          return  new ProductView({
            el: $parent,
            model: product,
            template: template
          });
        });
      },

      createProductListView : function($parent, product){
        return templateService.getCategoryProductTemplate().then(function(template){


          return  new ProductListView({
            el: $parent,
            model: products,
            template: template
          });
        });
      },

      createCategoryProductListView : function($parent, categoryId ){
      },

      createProductCompactView : function($parent, product){
        return templateService.getProductTemplate().then(function(template){
          return  new ProductView({
            el: $parent,
            model: product,
            template: template
          });
        });
      },

      getProductsForCategory : function($parent, categoryId){
        dataService.getProductsForCategory(categoryId).then(function(productIdList){
          return productIdList;
        }, function (err) {
          messageService.error("CategoryService: Error getting products for category: " + categoryId+": "+err );
          console.log("CategoryService: Error getting category tree: " + categoryId+": "+err  );
        });
      },

      getCategoryTree: function(){
          return dataService.getCategoryTree().then(function(categoryTree){
            return categoryTree;;
          },function(err){
            messageService.error("CategoryService: Error getting category tree: " + id+": "+err );
            console.log("CategoryService: Error getting category tree: " + id+": "+err  );
          })
      }
    };

  return obj;
});
