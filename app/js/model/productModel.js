/**
 * Created by lcollins on 12/29/2015.
 */
define("model/productModel", ["backbone", "backbone.localStorage"], function (Backbone, BackboneLocalStorage) {

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

  obj['CartItem'] = Backbone.Model.extend({
    defaults: {
      productId: "",
      name: "",
      description: "",
      quantity: 0,
      price: 0.0
    }

  });

  obj['Cart'] = Backbone.Collection.extend({
    model: obj['CartItem'],
    lastItemId: 0,
    localStorage: new BackboneLocalStorage("cart"),
    fetch: function () {
      console.log("===== FETCH FIRED LOADING LOCAL STORAGE ====");
      //this.set(  JSON.parse(this.localStorage.getItem(this.id) ) );
    }
    });



    obj['CategoryCollection'] = Backbone.Collection.extend({
        model: obj.Category,
        url: prefix + "category/tree"
    });

    obj['Product'] = Backbone.Model.extend({
        defaults: {
            id: "",
            sku: "",
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
                product.mainImageLink = (mainImageLink) ? mainImageLink.href : "/images/no_image_available.jpg";
                return product;
            });
        }
    });

    return obj;
});
