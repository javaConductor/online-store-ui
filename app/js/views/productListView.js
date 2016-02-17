/**
 * Created by lcollins on 12/27/2015.
 */
define("views/productListView",
  ["model/productModel",
    "q",
    "backbone"
  ],
  function (ProductModel, Q, Backbone) {
    console.log("Product List View ProductModel:"+ProductModel);
    return  Backbone.View.extend({
      initialize: function(options) {

      },

      className: "product",
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
