/**
 * Created by lcollins on 12/27/2015.
 */
define("views/categoryProductView",
  ["model/productModel",
    "q",
    "backbone", "services/templateService", "ProductView"
  ],
  function (ProductModel, Q, Backbone, templateService) {

  var prefix = "http://" + window.location.hostname + ":8889/";

    return  Backbone.View.extend({
      initialize: function(options) {
        this.model = options.category
      },

      tagName: "tr",

      className: "product",
      template: templateService.getCategoryProductTemplate(),
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
        this.$el.html(this.template(this.model.attributes));
        return this;
      },
    });

});
