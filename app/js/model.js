/**
 * Created by lcollins on 12/29/2015.
 */
define("model", ["backbone"], function (Backbone) {

  var prefix = "http://" + window.location.hostname + ":8889/";

  var obj = {

    Product: Backbone.Model.extend({
      defaults: {
        id: "",
        name: "",
        optionDefinitions: {},
        categoryId: "",
        description: "",
        weightInOunces: 0.0,
        extraInfo: {},
        currency: "USD",
        price: -1,
        status: "NOT-AVAILABLE",
        mediaFileIds: {},
        inventoryIds: [],
        _links: {}
      },
      validate: function (attrs, options) {
        if (!attrs.name) {
          return "Product name is required.";
        }
        if (attrs.price < 0) {
          return "Product price not set.";
        }
        if (!attrs.currency) {
          return "Product price currency not set.";
        }
      },
      /**
       * We'll see how this works
       * @returns {string}
       */
      url: function url() {
        var link = this._links.find(function (lnk) {
          lnk.rel == "self"
        });
        return link.href;
      }
    }),
  }
  self = obj;
  return obj;
});
