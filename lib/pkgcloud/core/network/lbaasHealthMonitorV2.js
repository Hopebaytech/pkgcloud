var util = require('util'),
    model = require('../base/model');

var lbaasHealthMonitorV2 = exports.lbaasHealthMonitorV2 = function (client, details) {
  model.Model.call(this, client, details);
};

util.inherits(lbaasHealthMonitorV2, model.Model);
