var util = require('util'),
    base = require('../../core/network/lbaasMembersV2'),

    _ = require('underscore');

//VIP prototype
var lbaasMembersV2 = exports.lbaasMembersV2 = function lbaasMembersV2(client, details) {
  base.lbaasMembersV2.call(this, client, details);
};

util.inherits(lbaasMembersV2, base.lbaasMembersV2);

lbaasMembersV2.prototype._setProperties = function (details) {
  console.log(details);
  this.admin_state_up = details.admin_state_up || this.admin_state_up;
  this.address = details.address || this.address;
  this.protocol_port = details.protocol_port || this.protocol_port;
  this.weight = details.weight || this.weight;
  this.subnet_id = details.subnet_id || this.subnet_id;
  this.id = details.id || this.id;
};

lbaasMembersV2.prototype.toJSON = function () {
  return _.pick(this, ['admin_state_up', 'address', 'protocol_port',
  'weight', 'subnet_id', 'id']);
};