/**
 * Created by lcollins on 1/3/2016.
 */
define("services/categoryService",
  ["model/productModel", "data",'q', "services/messageService","services/templateService","views/productView"],
  function (productModel, dataService, Q, messageService, templateService, ProductView) {
  var prefix = "http://" + window.location.hostname + ":8889/";
  console.log("creating ProductService productModel.Product:"+productModel.Product);

    var categoryTree;
  var productCollection = new productModel.ProductCollection;
  productCollection.fetch();
  console.log("created ProductCollection");

    var obj =  {

      createCategoryProductListView : function($parent, categoryId ){
      },


      getProductsForCategory : function($parent, categoryId){
        dataService.getProductsForCategory(categoryId).then(function(productIdList){
          return productIdList;
        }, function (err) {
          messageService.error("CategoryService: Error getting products for category: " + categoryId+": "+err );
          console.log("CategoryService: Error getting category tree: " + categoryId+": "+err  );
        });
      },
      findCategoryInTree: function (categoryTree, categoryId) {
        if (categoryTree.id == categoryId)
          return categoryTree;

        for (var n in categoryTree.children) {
          var child = categoryTree.children[n];
          var cat = obj.findCategoryInTree(child, categoryId);
          if (cat)
            return cat;
        }
        return null;
      },

      getCategory: function (categoryId) {
        var p = categoryTree ? Q(categoryTree) : obj.getCategoryTree();
        return p.then(function (tree) {
          return obj.findCategoryInTree(tree, categoryId);
        });
      },
      getCategoryTree: function(){
        return dataService.getCategoryTree().then(function (catTree) {
          categoryTree = catTree;
            return categoryTree;;
          },function(err){
            messageService.error("CategoryService: Error getting category tree: " + id+": "+err );
            console.log("CategoryService: Error getting category tree: " + id+": "+err  );
          })
      }
    };

    obj.getCategoryTree();
  return obj;
});
