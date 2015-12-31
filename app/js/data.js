/**
 * Created by lcollins on 12/27/2015.
 */
define("data", ["q"], function (Q) {

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
