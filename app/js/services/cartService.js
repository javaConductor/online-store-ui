/**
 * Created by lcollins on 1/1/2016.
 */
define("services/cartService", [
        "jquery",
        "q",
        'model/productModel',
        "services/templateService",
"views/cartView"],
    function ($, Q, model, templateService, CartView) {
        var self;
        console.log("creating services/cartService");
        var template = templateService.getCartDisplayTemplate();
        var cart = new model.Cart();
        var obj = {
            addToCart: function (product, options) {
                return cart.addItem(product, options);
            },

            updateQuantity: function (cartItemId, qty) {

                var items = cart.get("items");
                var updItem = items.find(function (item) {
                    return cartItemId == item.get("id");
                });
                if (!updItem) {
                    throw "No such cart item: " + cartItemId;
                }
                return updItem.set("quantity", +qty);
            },

          userCart: function () {
            return cart;
          },
            createCartView: function ($parent, c) {
                return new CartView({
                    el: $parent,
                  cart: c,
                    template: template
                });
            }
        };


        self = obj;
        return obj;
    });
