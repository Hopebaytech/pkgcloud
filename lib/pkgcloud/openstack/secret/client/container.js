var urlJoin = require('url-join');

var containerResoutcePath = '/containers';

// Declaring variables for helper functions defined later
var _convertContainerToWireFormat;

exports.getContainers  = function (options, callback) {
  var self = this;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var getContainerOpts = {
    path: containerResoutcePath
  };

  this._request(getContainerOpts, function (err, body) {
    if (err) {
      return callback(err);
    }
    else if (!body || !body.containers || !(body.containers instanceof Array)) {
      return new Error('Malformed API Response');
    }
    return callback(err, body.containers.map(function (container) {
      return new self.models.Container(self, container);
    }));
  });
};

exports.getContainer = function (container, callback) {
  var self = this,
    containerId = container instanceof this.models.Container ? container.id : container;
  self.emit('log::trace', 'Getting details for container', containerId);
  this._request({
    path: urlJoin(containerResoutcePath, containerId),
    method: 'GET'
  }, function (err, body) {
    if (err) {
      return callback(err);
    }

    if (!body) {
      return new Error('Malformed API Response');
    }

    callback(err, new self.models.Container(self, body));
  });
};

/**
 * client.createContainer
 *
 * @description create a new container
 *
 * @param {object}    options
 * @param {String}    options.name      the name of the new container
 * @param callback
 */
exports.createContainer = function (options, callback) {
  var self = this;
  container = _convertContainerToWireFormat(options);

  var createContainerOpts = {
    method: 'POST',
    path: containerResoutcePath,
    body: container
  };

  self.emit('log::trace', 'Creating container', container);
  this._request(createContainerOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.Container(self, body));
  });
};

exports.updateContainer = function (containerId, callback) {
  var self = this;
  containerToUpdate = _convertContainerToWireFormat(container);

  var updateContainerOpts = {
    method: 'PUT',
    path: urlJoin(containerResoutcePath, containerId),
    contentType: 'text/plain',
    body: containerToUpdate
  };

  self.emit('log::trace', 'Updating container', containerId);
  this._request(updateContainerOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.Container(self, body));
  });
};

exports.destroyContainer = function (containerId, callback) {
  var self = this;
  self.emit('log::trace', 'Deleting container', containerId);
  this._request({
    path: urlJoin(containerResoutcePath, containerId),
    method: 'DELETE'
  }, function (err) {
    if (err) {
      return callback(err);
    }
    callback(err, containerId);
  });
};

_convertContainerToWireFormat = function (details){
  var wireFormat = {};
  wireFormat.consumers = details.consumers;
  wireFormat.container_ref = details.container_ref;
  wireFormat.type = details.type || "certificate";
  wireFormat.created = details.created;
  wireFormat.name = details.name;
  wireFormat.secret_refs = details.secret_refs;
  wireFormat.secret_type = details.secret_type;
  wireFormat.status = details.status;
  wireFormat.updated = details.updated;
  return wireFormat;
};
