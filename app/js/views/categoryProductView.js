/**
 * Created by lcollins on 12/27/2015.
 */
define("views/categoryProductView",
  ["services/productService",
    "services/messageService",
    "underscore",
    "q",
    "utils",
    "backbone",
    "services/templateService",
    "services/cartService"
  ],
  function (productService, messageService, _, Q, utils, Backbone, templateService, cartService) {

    var targetSelector;
    var self;
    var pTemplate = templateService.getProductTemplate();
    var viewHelper = {
      showOption: function ($parent, name, optDef) {
        console.log('showOption: ' + name)
        var $opt = $('<div/>');
        // create label
        var $label = $('<label/>');
        $label.addClass("col-xs-6  col-sm-6 col-md-6 col-lg-6");
        $label.text(name);
        $opt.append($label);

        // create values as dropdown or edit control
        var $valueEdit = viewHelper.createValueEditor(name, optDef, null);
        $opt.append($valueEdit);
        return $opt;
      },
      createValueEditor: function (name, optDef, currentValue) {
        var $valueEditor;
        /// Is it a choose 1 select ?
        var m = optDef.match(/choose1\((.*)\)/);
        // if choose one then show select with option values
        if (m) {
          var list = m[1];
          var valueList = list.split(',').map(function (val) {
            return val.trim();
          });

          /// it may be a select (if only one option then just set it with label)
          if (valueList.length == 1) {
            // create a label
            $valueEditor = $('<label>' + valueList[0] + '</label>');
          } else {// valueList has more than one thing in it
            // create a select
            $valueEditor = $('<select></select>');
            _.each(valueList, function (value, idx, wholeList) {
                var $option = $('<option/>');
                $option.text(value);
                $option.attr('value', value);
                $valueEditor.append($option);
              }
            );

          }
        }

        return $valueEditor;
      }
    };


    var renderCategoryView = function renderCategoryView($parent, category) {
      return pTemplate.then(function (templateFn) {
        return productService.getProductsForCategory(category.id).then(function (products) {
          var rowDataList = utils.createGroupedArray(products, 6);
          var $container = $("<div class='container' style='min-width: 90%' />");
          rowDataList.forEach(function (rowData) {
            var $row = $('<div class="row"></div>');
            rowData.forEach(function (product) {
              product.description = "";
              _.extend(product, viewHelper);
              var $product = $(templateFn(product));
              $product.addClass('col-xs-12  col-sm-6 col-md-4 col-lg-3');
              $product.attr('id', 'thumb_' + product.id);
              $product.on("click", function (e) {
                cartService.addToCart(product, {});
              })
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

    return  Backbone.View.extend({
      initialize: function(options) {
        self = this;
        this.targetSelector = options.targetSelector;
        this.category = options.category;
        targetSelector = options.targetSelector;
        _.bindAll(this, "render");
        var $thisEl = this.$el;
        //$.subscribe("/category/select", function (e, category) {
        //  self.category = category;
        //  console.log("Got " + e + " message w categry: " + JSON.stringify(category));
        //  console.log("Rendering view " + $(self.targetSelector));
        //  renderCategoryView($(self.targetSelector), self.category);
        //});
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
