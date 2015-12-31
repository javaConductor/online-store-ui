/**
 * Created by lcollins on 12/28/2015.
 */
require.config({
  baseUrl: "/js",
  paths: {
    "jquery": "libs/jquery/dist/jquery.min.js",
    "bootstrap": "libs/bootstrap/dist/js/bootstrap.min.js",
    "q": "libs/q/q.js",
    "underscore": "libs/underscore/underscore-min.js",
    backbone: 'libs/backbone/backbone-min.js',
    'backbone.localStorage': 'libs/backbone.localStorage/backbone.localStorage.js',
    "less": "libs/less/dist/less.min.js"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  },
  waitSeconds: 15
});
