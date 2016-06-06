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
      calculateSubTotal: function (cartItems) {
        return _.reduce(
          _.map(cartItems,
            function (item) {
              return item.get("quantity") * item.get("price");
            }),
          function (acc, num) {
            return acc + num;
          },
          0).toFixed(2)
      },
      render: function () {
        self.pTemplate.then(function (template) {
          self.$el.html(template(self.cart));//might not b the way to get attribute
          /// here we add the event listeners for quantity and remove changes
          self.cart.models.forEach(function (cartItem) {
            var cartItemId = cartItem.get('id');
            $("#qty_" + cartItemId).bind('change mouseup keyup', function (e) {
              var qty = $("#qty_" + cartItemId).val();
              var unitPrice = +cartItem.get('price');
              cartItem.set("quantity", qty);
              var newTotal = qty * unitPrice;
              $("#price_" + cartItemId).text(newTotal.toFixed(2));
              var subTtl = +self.calculateSubTotal(self.cart.models)
              $("#cart-sub-total").text(subTtl.toFixed(2))
            })
          });

          //this.$parent.append(this.$el);
        });
        return self;
      }
    });
});
