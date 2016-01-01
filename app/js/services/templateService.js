/**
 * Created by lcollins on 1/1/2016.
 */
define("templateService",["jquery", "q"], function ($, Q) {
  var self;
  var templateFnCache = {};

    var obj =  {

      getProductTemplate : function(){
        return self.getTemplate("product.html")
      },

      getTemplate : function(filename){
        if (templateFnCache[filename]){
          return Q(templateFnCache[filename]) ;
        }
        return Q($.get(prefix +  'templates/'+filename)).then( function (data) {
          var template = _.template(data);
          templateFnCache["product"] = template;
          return template;
        });
      },

    };
  self = obj;
  return obj;
});
