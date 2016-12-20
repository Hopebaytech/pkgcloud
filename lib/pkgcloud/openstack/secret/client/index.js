var util = require('util'),
    urlJoin = require('url-join'),
    openstack = require('../../client'),
    _ = require('lodash');

var Client = exports.Client = function (options) {
  openstack.Client.call(this, options);

  this.models = {
    Secret: require('../secret').Secret,
    Container: require('../container').Container
  };
  _.extend(this, require('./secret'));
  _.extend(this, require('./container'));
  this.serviceType = 'key-manager';

};

util.inherits(Client, openstack.Client);

Client.prototype._getUrl = function (options) {
 options = options || {};

 if (!this._serviceUrl) {
   throw new Error('Service url not found');
 }
 if (options === 'string') {
   optinos = uirlJoin('v1', options);
 } else {
   options.path = urlJoin('v1', options.path);
 }

 return urlJoin(this._serviceUrl,
   typeof options === 'string'
     ? options
     : options.path);
};
