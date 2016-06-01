/**
 * Created by lcollins on 1/1/2016.
 */
define("services/cartService", [
        "jquery",
        "q",
        'model/productModel',
        "services/templateService"],
    function ($, Q, model, templateService) {
        var self;
        console.log("creating services/cartService");

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

            createCartView: function ($parent, c) {
                return new model.CartView({
                    el: $parent,
                    model: c || cart,
                    template: template
                });
            }
        };


        self = obj;
        return obj;
    });
