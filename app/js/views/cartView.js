/**
 * Created by lcollins on 12/27/2015.
 */
define("views/cartView",
  ["model/productModel",
    "q",
    "backbone",
    "services/templateService"
  ],
  function (ProductModel, Q, Backbone, templateService) {
    
    return  Backbone.View.extend({
      initialize: function(options) {
        this.cart = options.cart;
      },
      tagName: "div",
      className: "shopping-cart",
      template: templateService.getCartDisplayTemplate(),
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
        this.$el.html(this.template(this.cart.attributes));//might not b the way to get attribute
        return this;
      },
    });
});
