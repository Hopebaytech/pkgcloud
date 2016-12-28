var util = require('util'),
    model = require('../base/model');

var secret = exports.Secret = function (client, details) {
  model.Model.call(this, client, details);
};

util.inherits(secret, model.Model);
