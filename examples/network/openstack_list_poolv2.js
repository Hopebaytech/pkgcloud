var getToken = require('./get_openstack_token');
getToken.getToken(function (id){
  var token = id;
  var pkgcloud = require('../../lib/pkgcloud');
  var KH_admin_tenantID = '6ade8ae8037b4e449a4c7c7a65dc5e1b';
  var client = pkgcloud.network.createClient({
    provider: 'openstack',
    tenantId: KH_admin_tenantID,
    token: token,
    region: 'RegionOne',
    authUrl: 'http://172.16.31.1:35357',
    strictSSL: false
  });

  client.getPoolsV2(function(err, listener) {
    if (err) {
      console.log(err);
    }
    console.log(listener);
  });
});