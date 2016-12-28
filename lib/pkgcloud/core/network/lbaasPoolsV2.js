var util = require('util'),
    model = require('../base/model');

var lbaasPoolsV2 = exports.lbaasPoolsV2 = function (client, details) {
  model.Model.call(this, client, details);
};

util.inherits(lbaasPoolsV2, model.Model);
