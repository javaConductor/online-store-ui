/**
 * Created by lcollins on 1/1/2016.
 */
define("services/cartService", ["jquery", "q", 'model/productModel'], function ($, Q, model) {
  var self;
  var templateFnCache = {};
  var prefix = "http://" + window.location.hostname + ":" + window.location.port + "/";
  console.log("creating services/templateService");

  var cart = new model.Cart();

  var obj = {
    addToCart: function (product) {

    },
    updateQuantity: function (cartItemId, qty) {

    }
  };
  self = obj;
  return obj;
});
