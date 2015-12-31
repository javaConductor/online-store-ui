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
        optionDefinitions: null,
        categoryId: "",
        description: "",
        weightInOunces: 0.0,
        extraInfo: null,
        currency: "USD",
        price: -1,
        status: "NOT-AVAILABLE",
        mediaFileIds: null,
        inventoryIds: null,
        _links: null
      },
      initialize: function(){
        this.set("optionDefinitions", {} );
        this.set("extraInfo", {} );
        this.set("mediaFileIds", {} );
        this.set("inventoryIds", [] );
        this.set("_links", [] );
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
    Customer: Backbone.Model.extend({


      defaults: {
        id: "",
        name: "",
        email: "",
        status: "NOT-AVAILABLE",
        mediaFileIds: null,
        inventoryIds: null,
        _links: null
      },


    });
  }
  self = obj;
  return obj;
});
