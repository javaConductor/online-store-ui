/**
 * Created by lcollins on 12/27/2015.
 */
define("views/productDisplayView",
  ["model/productModel",
    "q",
    "backbone",
    "services/templateService"
  ],
  function (ProductModel, Q, Backbone, templateService) {

  var prefix = "http://" + window.location.hostname + ":8889/";

    return  Backbone.View.extend({
      initialize: function(options) {
        this.category = options.category;
      },
      tagName: "tr",
      className: "category",
      model: ProductModel.ProductCollection,
      template: templateService.getProductDisplayTemplate(),
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

        _.each(
          _.map(this.category.children, function (subCat) {
            return new CategoryProductView({
              category: subCat
            });
          }), function (subCat) {
            this.$el.append(p);
          }
        );
        return this;
      },
    });
});
