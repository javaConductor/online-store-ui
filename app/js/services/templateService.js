/**
 * Created by lcollins on 1/1/2016.
 */
define("services/templateService",["jquery", "q"], function ($, Q) {
  var self;
  var templateFnCache = {};
  var prefix = "http://" + window.location.hostname + ":8888/";
  console.log("creating services/templateService");

    var obj =  {

      getProductTemplate : function(){
        return self.getTemplate("product.html")
      },

      getCategoryProductTemplate : function(){
        return self.getTemplate("category-products.html")
      },

      getTemplate : function(filename){
        if (templateFnCache[filename]){
          return Q(templateFnCache[filename]) ;
        }
        return Q($.get(prefix +  'templates/'+filename)).then( function (data) {
          var template = _.template(data);
          templateFnCache[ filename ] = template;
          return template;
        });
      },

    };
  self = obj;
  return obj;
});
