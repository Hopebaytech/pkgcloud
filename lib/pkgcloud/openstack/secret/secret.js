var util = require('util'),
    base = require('../../core/secret/secret'),
    _ = require('lodash');

var Secret = exports.Secret = function Secret(client, details) {
  base.Secret.call(this, client, details);
};

util.inherits(Secret, base.Secret);

Secret.prototype._setProperties = function (details) {
  this.name = details.name || this.name;
  this.expiration = details.expiration || this.expiration || 0;
  this.algorithm = details.algorithm || this.algorithm;
  this.bit_length = details.bit_length || this.bit_length;
  this.mode = details.mode || this.mode;
  this.payload = details.payload || this.payload;
  this.payload_content_type = details.content_type || this.content_type;
  this.payload_content_encoding = details.payload_content_encoding || this.payload_content_encoding;
  this.created = details.created || this.created;
  this.creator_id = details.creator_id || this.creator_id;
  this.secret_ref = details.secret_ref || this.secret_ref;
  this.secret_type = details.secret_type || this.secret_type;
  this.status = details.status || this.status;
  this.updated = details.updated || this.updated;
};

Secret.prototype.toJSON = function () {
  return _.pick(this, ['name', 'expiration', 'algorithm', 'bit_length', 'mode', 'payload_content_type', 'payload_content_encoding', 'created', 'creator_id',
   'secret_ref', 'secret_type', 'status', 'updated']);
};
