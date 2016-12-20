var util = require('util'),
    base = require('../../core/secret/secret'),
    _ = require('lodash');

var Secret = exports.Secret = function Secret(client, details) {
  base.Secret.call(this, client, details);
};

util.inherits(Secret, base.Secret);

Secret.prototype._setProperties = function (details) {
  this.algorithm = details.algorithm || this.algorithm;
  this.bit_length = details.bit_length || this.bit_length;
  this.content_types = details.content_types || this.content_types;
  this.created = details.created || this.created;
  this.creator_id = details.creator_id || this.creator_id;
  this.expiration = details.expiration || this.expiration || 0;
  this.mode = details.mode || this.mode;
  this.name = details.name || this.name;
  this.secret_ref = details.secret_ref || this.secret_ref;
  this.secret_type = details.secret_type || this.secret_type;
  this.status = details.status || this.status;
  this.updated = details.updated || this.updated;
};

Secret.prototype.toJSON = function () {
  return _.pick(this, ['algorithm', 'bit_length', 'content_types', 'created', 'creator_id',
  'expiration', 'mode', 'secret_type', 'secret_ref', 'status', 'updated', 'name']);
};
