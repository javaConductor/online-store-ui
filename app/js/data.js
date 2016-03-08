/**
 * Created by lcollins on 12/27/2015.
 */
define("data", ["q","services/messageService"], function (Q, messageService) {

  var prefix = "http://" + window.location.hostname + ":8889/";
  var self;

  var prepareProduct = function (product) {
    var mainImageLink = product._links.find(function (lnk) {
      return lnk.rel == "main";
    });
    product.mainImageLink = (mainImageLink) ? mainImageLink.href : "/images/no_image_available.jpg";
    return product;
  };

  var obj =  {

    _getLocation:function(){
      return {
        host: window.location.hostname,
        port: 8889
      }
    },

    getProducts:function(){
      var p = Q($.get(prefix + "product"));
      p.fail( function(err){
        console.log("getProducts Error: "+err);
      });
      return p.then(function (products) {
        return products.map(prepareProduct);
      });
    },

    getProductsForCategory:function(categoryId){
      var p = Q($.get(prefix + "product/for-category/"+categoryId));
      p.fail( function(err){
        messageService.error(err);
        console.log("getProducts for category Error: "+err);
      });
      return p.then(function (products) {
        return products.map(prepareProduct);
      });
    },

    getProduct:function(id){
      var p = Q($.get(prefix + "product/"+id));
      p.fail( function(err){
        messageService.error(err);
        console.log("getProduct Error: "+err);
      });
      return p.then(function (product) {
        return prepareProduct(product);
      });
    },

    getCategoryTree:function(){
      var p = Q($.get(prefix + "category/tree"));
      p.fail( function(err){
        messageService.error ( err );
        console.log("getCategoryTree Error: "+err);
      });
      return p;
    }

  };//obj
  self = obj;
  return obj;
});
