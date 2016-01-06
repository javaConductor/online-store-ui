/**
 * Created by lcollins on 1/3/2016.
 */
define("services/productService",["model/productModel", "data"],function (productModel, dataService) {
  var prefix = "http://" + window.location.hostname + ":8889/";
  console.log("creating ProductService");

  var productCollection = new productModel.ProductCollection({
    url: prefix + "product",
    model: productModel.Product
  });

  console.log("created ProductCollection");

    var obj =  {

      getProduct: function(id){
        var p = productCollection.where({ id : id});
        if (!p ){
          return dataService.getProduct(id).then(function(product){
            productCollection.add(new productModel.Product(product));
            return product;
          },function(err){})
        }else{
          return Q(p);
        }
      }

    };

  return obj;
});
