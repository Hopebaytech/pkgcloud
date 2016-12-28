var urlJoin = require('url-join');

var lbaasPoolPath = '/lbaas/pools';


// Declaring variables for helper functions defined later
var _convertPoolsMonitorAssociationToWireFormat,
    _convertPoolsToWireFormat,
    _convertPoolsUpdateToWireFormat;


/***

 list pool (Get)

***/
exports.getPoolsV2  = function (options, callback) {
  var self = this;
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var getPoolOpts = {
    path: lbaasPoolPath,
  };
  this._request(getPoolOpts, function (err, body) {
    if (err) {
      return callback(err);
    }
    else if (!body || !body.pools || !(body.pools instanceof Array)) {
      return callback(new Error('Malformed API Response'));
    }
    return callback(err, body.pools.map(function (pools) {
      return new self.models.lbaasPoolsV2(self, pools);
    }));
  });
};

/**

  Pool show

*/
exports.getPoolV2 = function (option, callback) {
  var self = this,
    poolId = option instanceof this.models.lbaasPoolsV2 ? option.id : option;
  self.emit('log::trace', 'Getting details for lbaas Pool', poolId);
  this._request({
    path: urlJoin(lbaasPoolPath, poolId),
    method: 'GET'
  }, function (err, body) {
    if (err) {
      return callback(err);
    }
    if (!body ||!body.pool) {
      return new Error('Malformed API Response');
    }
    callback(err, new self.models.lbaasPoolsV2(self, body.pool));
  });
};

/**

  Pool create
  {
    "pool": {
      "admin_state_up": true,
      "description": "simple pool",
      "lb_algorithm": "ROUND_ROBIN",
      "name": "pool1",
      "protocol": "HTTP",
      "listener_id": "1235"
    }
  }
**/
exports.createPoolV2 = function (options, callback) {
  var self = this,
    pool = typeof options === 'object' ? options : { 'name' : options};

  var pool_create = _convertPoolsToWireFormat(pool);

  var createPoolOpts = {
    method: 'POST',
    path: lbaasPoolPath,
    body: { 'pool' : pool_create}
  };

  self.emit('log::trace', 'Creating lbaas pool', pool);
  this._request(createPoolOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.lbaasPoolsV2(self, body.pool));
  });
};

/**
  Pool update
  {
    "admin_state_up": true,
    "description": "simple pool",
    "lb_algorithm": "ROUND_ROBIN",
    "name": "pool1",
  }
**/
exports.updatePoolV2 = function (options, callback) {
  var self = this,
  poolId = options.id,
  poolUpdate = _convertPoolsUpdateToWireFormat(options);
  var updatePoolsOpts = {
    method: 'PUT',
    path: urlJoin(lbaasPoolPath, poolId),
    contentType: 'application/json',
    body: { 'pool' : poolUpdate }
  };
  self.emit('log::trace', 'Updating lbaas pools', poolId);
  this._request(updatePoolsOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.lbaasPoolsV2(self, body.pool));
  });
};

/*
    Pool delete

*/
exports.destroyPoolV2 = function (options, callback) {
  var self = this,
    poolId = options instanceof this.models.lbaasPoolsV2 ? options.id : options;
  self.emit('log::trace', 'Deleting lbaas pool', poolId);
  this._request({
    path: urlJoin(lbaasPoolPath, poolId),
    contentType: 'application/json',
    method: 'DELETE'
  }, function (err) {
    if (err) {
      return callback(err);
    }
    callback(err, poolId);
  });
};

/***

 list member (Get)

***/
exports.getMembersV2 = function (options, callback) {
  var self = this;
  var poolId = options instanceof this.models.lbaasPoolsV2 ? option.id : options;
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  self.emit('log::trace', 'Getting lbaas Pool members', poolId);
  var getMemberOpts = {
    path: urlJoin(lbaasPoolPath, poolId, 'members')
  };
  this._request(getMemberOpts, function (err, body) {
    if (err) {
      return callback(err);
    }
    else if (!body || !body.members || !(body.members instanceof Array)) {
      return callback(new Error('Malformed API Response'));
    }

    return callback(err, body.members.map(function (member) {
      return new self.models.lbaasMembersV2(self, member);
    }));
  });
}

/**

  Member show

*/
exports.getMemberV2 = function (option, callback) {
  var self = this;
  var poolId = option.pool_id;
  var memberId = option.member_id;
  self.emit('log::trace', 'Getting details for member', memberId);
  this._request({
    path: urlJoin(lbaasPoolPath, poolId, 'members', memberId),
    method: 'GET'
  }, function (err, body) {
    if (err) {
      return callback(err);
    }
    if (!body ||!body.member) {
      return new Error('Malformed API Response');
    }
    callback(err, new self.models.lbaasMembersV2(self, body.member));
  });
};

/**
  Member create
  {
    "member": {
      "address": "10.0.0.22",
      "admin_state_up": true,
      "protocol_port": "90",
      "pool_id": "5a9a3e9e-d1aa-448e-af37-a70171f2a332",
      "weight": "1",
      "subnet_id" : "234444"
    }
  }
**/
exports.createMemberV2 = function (options, callback) {
  var self = this;
  var poolId = options.pool_id;

  var memberCreate = _convertMemberToWireFormat(options);

  var createMemberOpts = {
    method: 'POST',
    path: urlJoin(lbaasPoolPath, poolId, 'members'),
    body: { 'member' : memberCreate }
  };

  self.emit('log::trace', 'Creating lbaas pool member', memberCreate);
  this._request(createMemberOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.lbaasMembersV2(self, body.member));
  });
};

exports.updateMemberV2 = function (options, callback) {
  var self = this;
  var poolId = options.pool_id;
  var memberId = options.member_id;
  var memberUpdate = _convertMemberUpdateToWireFormat(options);

  var updateMemberOpts = {
    method: 'PUT',
    path: urlJoin(lbaasPoolPath, poolId, 'members', memberId),
    contentType: 'application/json',
    body: { 'member' : memberUpdate }
  };

  self.emit('log::trace', 'Updating lbaas pool member', memberId);
  this._request(updateMemberOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.lbaasMembersV2(self, body.member));
  });
};

exports.destroyMemberV2 = function (options, callback) {
  var self = this;
  var poolId = options.pool_id;
  var memberId = options.member_id;
  self.emit('log::trace', 'Deleting lbaas member', memberId);
  this._request({
    path: urlJoin(lbaasPoolPath, poolId, 'members', memberId),
    contentType: 'application/json',
    method: 'DELETE'
  }, function (err) {
    if (err) {
      return callback(err);
    }
    callback(err, poolId);
  });
};

_convertPoolsUpdateToWireFormat = function (details){
  var wireFormat = {};
  wireFormat.admin_state_up = details.admin_state_up || true;
  wireFormat.description = details.description;
  wireFormat.lb_algorithm = details.lb_algorithm || 'ROUND_ROBIN';
  wireFormat.name = details.name;
  return wireFormat;
};

_convertPoolsToWireFormat = function (details){
  var wireFormat = {};
  wireFormat.admin_state_up = details.admin_state_up || true;
  wireFormat.description = details.description;
  wireFormat.lb_algorithm = details.lb_algorithm || 'ROUND_ROBIN';
  wireFormat.listener_id = details.listener_id;
  wireFormat.name = details.name;
  wireFormat.protocol = details.protocol;
  return wireFormat;
};

_convertMemberToWireFormat = function (details) {
  var wireFormat = {};
  wireFormat.address = details.address;
  wireFormat.admin_state_up = details.admin_state_up || true;
  wireFormat.protocol_port = details.protocol_port;
  wireFormat.weight = details.weight;
  wireFormat.subnet_id = details.subnet_id;
  return wireFormat;
};

_convertMemberUpdateToWireFormat = function (details) {
  var wireFormat = {};
  wireFormat.admin_state_up = details.admin_state_up || true;
  wireFormat.protocol_port = details.protocol_port;
  wireFormat.weight = details.weight;
  return wireFormat;
}
