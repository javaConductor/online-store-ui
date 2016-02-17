/**
 * Created by lcollins on 1/3/2016.
 */
define("messageService",
  [],
  function () {
    console.log("creating messageService");

    var alerts = [];
    var self;

    /// create the view
    var obj = {

      error: function (msg) {
        alerts.push({'type': 'error', 'msg': msg});
      },

      warning: function (msg) {
        alerts.push({'type': 'warning', 'msg': msg});
      },

      success: function (msg) {
        alerts.push({'type': 'success', 'msg': msg});
      },

      info: function (msg) {
        alerts.push({'type': 'info', 'msg': msg});
      },

      closeAlert: function (index) {
        alerts.splice(index, 1);
      }

    };
    self = obj;
    return obj;
  });
