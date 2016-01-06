/**
 * Created by lcollins on 1/3/2016.
 */
define("views/messageView",
  ["backbone"],
  function (Backbone) {
    return Backbone.View.extend({
      tagName: "ul",
      template: _.template("<ul> " +
      "<% _.each(alerts, function(alert){  %>" +
        "<li class='<%= alert.type %>'> <%= alert.msg %></li>" +
      "  }); %>"+
      "</ul>"),
      render:function(  ){
        this.$el.html(this.template(this.model.attributes));
        return this;
      }
    });
});
