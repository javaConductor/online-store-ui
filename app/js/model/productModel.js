/**
 * Created by lcollins on 12/29/2015.
 */
define("model/productModel", ["backbone"], function (Backbone) {

  var prefix = "http://" + window.location.hostname + ":8889/";

  console.log("creating productModel");
  var obj = {};

  obj['Customer'] = Backbone.Model.extend({

    defaults: {
      id: "",
      name: "",
      email: "",
      status: "NOT-AVAILABLE",
      mediaFileIds: null,
      inventoryIds: null,
      _links: null
    }
  });

    obj['Category'] = Backbone.Model.extend({

      defaults: {
        id: "",
        name: "",
        displayName: "",
        children: [],
        classifier: false,
        _links: null
      }
    });

    obj['CategoryCollection'] = Backbone.Collection.extend({
      model: obj.Category,
      url: prefix + "category"
    });

    obj['Product'] = Backbone.Model.extend({
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
      initialize: function () {
        this.set("optionDefinitions", {});
        this.set("extraInfo", {});
        this.set("mediaFileIds", {});
        this.set("inventoryIds", []);
        this.set("_links", []);
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
      url: prefix + "product"

    });

    obj['ProductCollection'] = Backbone.Collection.extend({
      model: obj.Product,
      url: prefix + "product",
      parse: function (productList) {
        return productList.map(function (product) {
          /// take the main image link out of the _links array
          // and make it a first-class member for the UI only.
          var mainImageLink = (product._links || []).find(function (lnk) {
            return lnk.rel == "main";
          });
          if (mainImageLink)
            product.mainImageLink = mainImageLink.href;
          return product;
        });
      }
    });
  return obj;
});