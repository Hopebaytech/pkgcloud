/*
 * index.js: Top-level include for the Openstack secret client.
 */

exports.Client  = require('./client').Client;
exports.Secret = require('./secret').Secret;
exports.Container = require('./container').Container;
exports.createClient = function (options) {
  return new exports.Client(options);
};
