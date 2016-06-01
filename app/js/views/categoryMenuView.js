/**
 * Created by lee on 5/31/16.
 */
/**
 * Created by lcollins on 12/27/2015.
 */
define("views/categoryMenuView",
    ["model/productModel",
        "q",
        "backbone",
        "data",
        'routes/appRouter'
    ],
    function (ProductModel, Q, Backbone, data, appRouter) {

        var handleCategoryClick = function (category, e) {
            console.log("Menu: [" + category.name + "] selected.");
            $.publish("/category/select", category);
        };

        var prefix = "http://" + window.location.hostname + ":8889/";
        var renderCategories = function ($parent, categories) {
            /*<li class="active"><a href="#">Home</a></li>
             <li class="dropdown">
             <a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
             <ul class="dropdown-menu">
             <li><a href="#">Page 1-1</a></li>
             <li><a href="#">Page 1-2</a></li>
             <li><a href="#">Page 1-3</a></li>
             </ul>
             </li>*/
            categories.forEach(function (cat) {
                var $cat = $("<li></li>");
                if (cat.children && cat.children.length > 0) {
                    $cat.addClass("dropdown");
                    var $catLabel = $("<a href='#' >" + (cat.displayName || cat.name ) + "<span class='caret'></span></a>");
                    $catLabel.addClass("dropdown-toggle");
                    $catLabel.data("toggle", "collapse");
                    $catLabel.data("target", ".nav-collapse");

                    // data-toggle="collapse" data-target=".nav-collapse"
                    $cat.append($catLabel);

                    //now add the children
                    var $children = $("<ul></ul>");
                    $children.addClass("nav");
                    $children.addClass("dropdown-menu");
                    $children.addClass("nav-collapse collapse")
                    $cat.append($children);
                    renderCategories($children, cat.children);
                } else {
                    var $catLabel = $("<a href='#' >" + (cat.displayName || cat.name ) + "</a>");

                    $cat.append($catLabel);
                }

                /// Classifiers DO NOT HAVE PRODUCTS ONLY OTHER CHILD CATEGORIES
                if (!cat.classifier || cat.children.length != 0)
                    $cat.on("click", _.partial(handleCategoryClick, cat));
                $parent.append($cat);
                $parent.find(".dropdown-toggle").dropdown();
                console.log("Added " + JSON.stringify(cat) + " to " + JSON.stringify($parent));
            });
        };
        var renderCategories2 = function ($parent, categories) {
            /*
             <li>
             <a class="trigger right-caret">Level 3</a>
             <ul class="dropdown-menu sub-menu">
             <li><a href="#">Level 4</a></li>
             <li><a href="#">Level 4</a></li>
             <li><a href="#">Level 4</a></li>
             </ul>
             </li>
             */

            categories.forEach(function (cat) {
                var $cat = $("<li></li>");
                if (cat.children && cat.children.length > 0) {
                    var $catLabel = $("<a class='trigger right-caret' href='#' >" + (cat.displayName || cat.name ) + "</a>");

                    // data-toggle="collapse" data-target=".nav-collapse"
                    $cat.append($catLabel);

                    //now add the children
                    var $children = $("<ul ></ul>");
                    $children.addClass("nav");
                    $children.addClass("dropdown-menu");
                    $children.addClass("sub-menu");

                    $cat.append($children);
                    renderCategories2($children, cat.children);
                } else {
                    var $catLabel = $("<a href='#' >" + (cat.displayName || cat.name ) + "</a>");
                    $cat.append($catLabel);
                }

                /// Classifiers DO NOT HAVE PRODUCTS ONLY OTHER CHILD CATEGORIES
                if ((!cat.classifier || cat.children.length == 0))
                    $catLabel.on("click", _.partial(handleCategoryClick, cat));
                $parent.append($cat);
                $parent.find(".dropdown-toggle").dropdown();
                console.log("Added " + JSON.stringify(cat) + " to " + JSON.stringify($parent));
            });
        };
        var createMenu = function createMenu($parent, topLevelCategories) {
            $parent.addClass("navbar");
            $parent.addClass("navbar-inverse");

            var $container = $("<div> </div>");
            $container.addClass("container");
            $parent.append($container);

            var $header = $("<div></div>");
            $header.addClass("navbar-header");
            $header.append("<a href='#main' class='navbar-brand'>Home</a> ");
            $container.append($header);

            var $navBar = $("<ul/>");
            $navBar.addClass("nav");
            $navBar.addClass("navbar-nav");
            $container.append($navBar);

            renderCategories($navBar, topLevelCategories);
            console.log("Added categories to navBar ");

            $(targetSelector).append($parent);
            console.log("Added menuView to $(" + targetSelector + ")");
        };
        var createMenu2 = function createMenu2($parent, topLevelCategories) {

            $parent.addClass("dropdown");
            $parent.attr("style", "position:relative");

            var $dropDown = $('<a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Categories <span class="caret"></span></a>');
            $parent.append($dropDown);
            var $menu = $(' <ul class="dropdown-menu " /> ');
            $parent.append($menu);

            renderCategories2($menu, topLevelCategories);
            console.log("Added categories to navBar ");

            $(targetSelector).append($parent);
            console.log("Added menuView to $(" + targetSelector + ")");
        };

        var targetSelector;
        return Backbone.View.extend({
            initialize: function (options) {
                targetSelector = options.targetSelector;
                _.bindAll(this, "render");
                this.render();
            },
            tagName: "div",
            className: "category",
            model: new ProductModel.CategoryCollection,
            assign: function (selector, view) {
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
                var $parent = this.$el;
                data.getCategoryTree().then(function (rootCategory) {
                    createMenu2($parent, rootCategory.children);
                    $parent.find(".dropdown-menu > li > a.trigger").on("click", function (e) {
                        var current = $(this).next();
                        var grandparent = $(this).parent().parent();
                        if ($(this).hasClass('left-caret') || $(this).hasClass('right-caret'))
                            $(this).toggleClass('right-caret left-caret');
                        grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
                        grandparent.find(".sub-menu:visible").not(current).hide();
                        current.toggle();
                        e.stopPropagation();
                    });

                    $parent.find(".dropdown-menu > li > a:not(.trigger)").on("click", function () {
                        var root = $(this).closest('.dropdown');
                        root.find('.left-caret').toggleClass('right-caret left-caret');
                        root.find('.sub-menu:visible').hide();
                    });
                    return this;
                })
            }
        });
    });
