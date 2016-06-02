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
    var self;
    return  Backbone.View.extend({
      initialize: function(options) {
        self = this;
        this.cart = options.cart;
        this.$parent = options.el;
        this.el = options.el;
        this.render();
      },
      tagName: "div",
      className: "shopping-cart",
      pTemplate: templateService.getCartDisplayTemplate(),
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
        self.pTemplate.then(function (template) {
          self.$el.html(template(self.cart.attributes));//might not b the way to get attribute
          //this.$parent.append(this.$el);
        });
        return self;
      }
    });
});
