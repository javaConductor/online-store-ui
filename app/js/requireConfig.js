/**
 * Created by lcollins on 12/28/2015.
 */
require.config({
  baseUrl: "/js",
  paths: {
    "jquery": "/libs/jquery/dist/jquery.min",
    "bootstrap": "/libs/bootstrap/dist/js/bootstrap.min",
    "q": "/libs/q/q",
    "underscore": "/libs/underscore/underscore-min",
    backbone: '/libs/backbone/backbone-min',
    'backbone.localStorage': '/libs/backbone.localStorage/backbone.localStorage'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    q: {
      exports: "q"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone.localStorage'
    }
  },
  waitSeconds: 15
});
