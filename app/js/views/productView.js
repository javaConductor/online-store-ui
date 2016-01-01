/**
 * Created by lcollins on 12/27/2015.
 */
define("ProductView",
  ["model/productModel",
    "q",
    "backbone", "templateService"
  ],
  function (ProductModel, Q, Backbone, templateService) {

  var prefix = "http://" + window.location.hostname + ":8889/";

    return  Backbone.View.Extend({
      initialize: function(options) {

      },

      className: ".product",
      model: ProductModel.ProductCollection,
      template: templateService.getProductTemplate(),
      assign : function (selector, view) {
        var selectors;
        if (_.isObject(selector)) {
          selectors = selector;
        }
        else {
          selectors = {};
          selectors[selector] = view;
        }
        if (!selectors) return;
        _.each(selectors, function (view, selector) {
          view.setElement(this.$(selector)).render();
        }, this);
      },
      render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
      },
    });

});
