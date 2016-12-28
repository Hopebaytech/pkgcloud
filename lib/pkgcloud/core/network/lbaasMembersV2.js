var util = require('util'),
    model = require('../base/model');

var lbaasMembersV2 = exports.lbaasMembersV2 = function (client, details) {
  model.Model.call(this, client, details);
};

util.inherits(lbaasMembersV2, model.Model);
