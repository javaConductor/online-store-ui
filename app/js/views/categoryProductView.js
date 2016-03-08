/**
 * Created by lcollins on 12/27/2015.
 */
define("views/categoryProductView",
  ["services/productService",
    "services/messageService",
    "underscore",
    "q",
    "utils",
    "backbone", "services/templateService"
  ],
  function (productService, messageService, _, Q, utils, Backbone, templateService) {

    var pTemplate = templateService.getProductTemplate();

    var renderCategoryView = function renderCategoryView($parent, category) {
      return pTemplate.then(function (templateFn) {
        return productService.getProductsForCategory(category.id).then(function (products) {
          var rowDataList = utils.createGroupedArray(products, 6);
          var $container = $("<div class='container' style='min-width: 90%' />");
          rowDataList.forEach(function (rowData) {
            var $row = $('<div class="row"></div>');
            rowData.forEach(function (product) {
              product.description = "";
              var $product = $(templateFn(product));
              $product.addClass('col-xs-12  col-sm-6 col-md-4 col-lg-3');
              $product.attr('id', 'thumb_' + product.id);
              $row.append($product);
            });
            $container.append($row);
            $parent.append($container);
          });
        }, function (error) {
          messageService.error(error);
        })

      })
        ;

    };
    var targetSelector;
    var self;
    return  Backbone.View.extend({
      initialize: function(options) {
        self = this;
        this.targetSelector = options.targetSelector;
        this.category = options.category;
        targetSelector = options.targetSelector;
        _.bindAll(this, "render");
        var $thisEl = this.$el;
        $.subscribe("/category/select", function (e, category) {
          self.category = category;
          console.log("Got " + e + " message w categry: " + JSON.stringify(category));
          console.log("Rendering view " + $(self.targetSelector));
          renderCategoryView($(self.targetSelector), self.category);
        });
        return this;
      },

      tagName: "div",
      className: "category-product-list",
      //template: templateService.getCategoryProductTemplate(),
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
        if (!this.category)
          return this;
        var $container = this.$el;
        $container.addClass('container');
        renderCategoryView($container, this.category);
        $(targetSelector).append($container);
        return this;
      },
    });

});
