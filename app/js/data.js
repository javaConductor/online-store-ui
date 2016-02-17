/**
 * Created by lcollins on 12/27/2015.
 */
define("data", ["q","services/messageService"], function (Q, messageService) {

  var prefix = "http://" + window.location.hostname + ":8889/";
  var self;
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
      return p;
    },

    getProductsForCategory:function(categoryId){
      var p = Q($.get(prefix + "product/for-category/"+categoryId));
      p.fail( function(err){
        messageService.error(err);
        console.log("getProducts for category Error: "+err);
      });
      return p;
    },

    getProduct:function(id){
      var p = Q($.get(prefix + "product/"+id));
      p.fail( function(err){
        messageService.error(err);
        console.log("getProduct Error: "+err);
      });
      return p;
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
