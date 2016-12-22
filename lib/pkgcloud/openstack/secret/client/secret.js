var urlJoin = require('url-join');

var secretResoutcePath = '/secrets';

// Declaring variables for helper functions defined later
var _convertSecretToWireFormat;

exports.getSecrets  = function (options, callback) {
  var self = this;

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var getSecretOpts = {
    path: secretResoutcePath
  };

  this._request(getSecretOpts, function (err, body) {
    if (err) {
      return callback(err);
    }
    else if (!body || !body.secrets || !(body.secrets instanceof Array)) {
      return new Error('Malformed API Response');
    }

    return callback(err, body.secrets.map(function (secret) {
      return new self.models.Secret(self, secret);
    }));
  });
};

exports.getSecret = function (secret, callback) {
  var self = this,
    secretId = secret instanceof this.models.Secret ? secret.id : secret;
  self.emit('log::trace', 'Getting details for secret', secretId);
  this._request({
    path: urlJoin(secretResoutcePath, secretId),
    method: 'GET'
  }, function (err, body) {
    if (err) {
      return callback(err);
    }

    if (!body) {
      return new Error('Malformed API Response');
    }

    callback(err, new self.models.Secret(self, body));
  });
};

exports.createSecret = function (options, callback) {
  var self = this;
  secret = _convertSecretToWireFormat(options);

  var createSecretOpts = {
    method: 'POST',
    path: secretResoutcePath,
    body: secret
  };

  self.emit('log::trace', 'Creating secret', secret);
  this._request(createSecretOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.Secret(self, body));
  });
};

exports.updateSecret = function (secretId, callback) {
  var self = this;
  secretToUpdate = _convertSecretToWireFormat(secret);

  var updateSecretOpts = {
    method: 'PUT',
    path: urlJoin(secretResoutcePath, secretId),
    contentType: 'text/plain',
    body: secretToUpdate
  };

  self.emit('log::trace', 'Updating secret', secretId);
  this._request(updateSecretOpts, function (err,body) {
    return err
      ? callback(err)
      : callback(err, new self.models.Secret(self, body));
  });
};

exports.destroySecret = function (secretId, callback) {
  var self = this;
  self.emit('log::trace', 'Deleting secret', secretId);
  this._request({
    path: urlJoin(secretResoutcePath, secretId),
    method: 'DELETE'
  }, function (err) {
    if (err) {
      return callback(err);
    }
    callback(err, secretId);
  });
};

_convertSecretToWireFormat = function (details){
  var wireFormat = {};
  wireFormat.name = details.name;
  wireFormat.expiration = details.expiration;
  wireFormat.algorithm = details.algorithm || "aes";
  wireFormat.bit_length = details.bit_length;
  wireFormat.mode = details.mode || "mode";
  wireFormat.payload = details.payload;
  wireFormat.payload_content_type = details.payload_content_type || "text/plain";
  wireFormat.payload_content_encoding = details.payload_content_encoding;
  return wireFormat;
};
