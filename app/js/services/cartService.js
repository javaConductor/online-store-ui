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
    var pTemplate = templateService.getCartDisplayTemplate();
    var cart = new model.Cart();
    cart.add(cart.localStorage.findAll());
    var obj = {
      findCartItem: function (product, options) {
        return cart.models.find(function (cartItem) {
          return cartItem.get("productId") == product.id && (_.isEqual(options, cartItem.get("options")));
        });
      },

      findCartItemById: function (cartItemId) {
        return cart.models.find(function (cartItem) {
          return cartItem.get("id") == cartItemId;
        });
      },

      updateQuantity: function (cartItemId, qty) {
        var updItem = self.findCartItemById(cartItemId);
        if (!updItem) {
          throw "No such cart item: " + cartItemId;
        }
        updItem.set("quantity", +qty);
        updItem.save();
      },

      addToCart: function (product, options) {
        var item = self.findCartItem(product, options);
        if (!item) {

          cart.lastItemId++;
          var nextId = cart.lastItemId;
          item = new model.CartItem({
            id: nextId,
            productId: product.id,
            name: product.name,
            description: product.description,
            quantity: 1,
            price: product.price,
            options: options
          });
          cart.add(item);
        } else {
          self.updateQuantity(item.get("id"), item.get("quantity") + 1);
        }
        item.save();
        return cart.models;
      },

      userCart: function () {
        return cart;
      }
    };
    self = obj;
    return obj;
  });
