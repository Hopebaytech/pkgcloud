var util = require('util'),
    model = require('../base/model');

var container = exports.Container = function (client, details) {
  model.Model.call(this, client, details);
};

util.inherits(container, model.Model);
