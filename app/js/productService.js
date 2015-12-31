/**
 * Created by lcollins on 12/27/2015.
 */

define("productService",
    ["data"], function (dataService) {

    var prefix = "http://" + window.location.hostname + ":8889/";
    var self;
    var obj =  {

      getProducts:function(){
        var p = Q($.get(prefix + "product"));
        p.fail( function(err){
          console.log("getProducts Error: "+err)
        });
        return p;
      },

      getCategoryTree:function(){
        var p = Q($.get(prefix + "category/tree"));
        p.fail( function(err){
          console.log("getCategoryTree Error: "+err)
        });
        return p;
      }

    };//obj
    self = obj;
    return obj;
  });
