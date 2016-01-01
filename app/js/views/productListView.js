/**
 * Created by lcollins on 12/27/2015.
 */
define("ProductListView",
  ["model/productModel",
    "q",
    "backbone"
  ],
  function (ProductModel, Q, Backbone) {

  var prefix = "http://" + window.location.hostname + ":8889/";

    return  Backbone.View.Extend({
      initialize: function(options) {

      },

      className: ".product",
      collection: ProductModel.ProductCollection,
      model: ProductModel.Product,
      template: _.template($('#product-template').html()),
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
