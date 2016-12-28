var util = require('util'),
    base = require('../../core/secret/container'),
    _ = require('lodash');

var Container = exports.Container = function Container(client, details) {
  base.Container.call(this, client, details);
};

util.inherits(Container, base.Container);

Container.prototype._setProperties = function (details) {
  this.consumers = details.consumers || this.consumers;
  this.container_ref = details.container_ref || this.container_ref;
  this.type = details.type || this.type;
  this.created = details.created || this.created;
  this.name = details.name || this.name;
  this.secret_refs = details.secret_refs || this.secret_refs;
  this.status = details.status || this.status;
  this.updated = details.updated || this.updated;
};

Container.prototype.toJSON = function () {
  return _.pick(this, ['consumers', 'container_ref', 'type', 'created',
  'name', 'secret_refs', 'status', 'updated']);
};
