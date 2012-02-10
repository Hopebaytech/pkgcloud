/*
 * index.js: Compute client for Joyent CloudAPI
 *
 * (C) 2012 Nodejitsu Inc.
 *
 */

var utile     = require('utile'),
    joyent    = require('../../client');

var Client = exports.Client = function (options) {
  joyent.Client.call(this, options);

  utile.mixin(this, require('./flavors'));
  utile.mixin(this, require('./images'));
  utile.mixin(this, require('./servers'));
};

utile.inherits(Client, joyent.Client);

Client.prototype.url = function () {
  var args = Array.prototype.slice.call(arguments);
  return [ this.config.serversUrl ? 'https://' + this.config.serversUrl :
           'https://us-sw-1.api.joyentcloud.com'
         ].concat(args).join('/');
};