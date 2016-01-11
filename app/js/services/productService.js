/**
 * Created by lcollins on 1/3/2016.
 */
define("services/productService",
  ["model/productModel", "data",'q', "services/messageService","services/templateService","views/productView"],
  function (productModel, dataService, Q, messageService, templateService, ProductView) {
  var prefix = "http://" + window.location.hostname + ":8889/";
  console.log("creating ProductService productModel.Product:"+productModel.Product);

  var productCollection = new productModel.ProductCollection;
  productCollection.fetch();
  console.log("created ProductCollection");

    var obj =  {

      createProductDetailView : function($parent, product){
        return templateService.getProductDetailTemplate().then(function(template){
          return  new ProductView({
            el: $parent,
            model: product,
            template: template
          });
        });
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

      getProduct: function(id){
        var p = productCollection.where({ id : id});
        if (!p || p.length == 0){
          return dataService.getProduct(id).then(function(product){
            product = productCollection.parse([product])[0];
            var pModel = new productModel.Product( product );
            productCollection.add(pModel);
            return pModel;
          },function(err){
            messageService.error("ProductService: Error getting product: " + id+": "+err );
            console.log("ProductService: Error getting product: " + id+": "+err  );
          })
        }else{
          return Q(p);
        }
      }
    };

  return obj;
});
