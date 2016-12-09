var pkgcloud = require('../../lib/pkgcloud');
var getToken = require('./get_openstack_token');
var KH_admin_tenantID = '6ade8ae8037b4e449a4c7c7a65dc5e1b';
getToken.getToken(function (id){
  var client = pkgcloud.network.createClient({
    provider: 'openstack',
    tenantId: KH_admin_tenantID,
    token: id,
    region: 'RegionOne',
    authUrl: 'http://172.16.31.1:35357',
    strictSSL: false
  });


  var options = {
    'id': '3a3bd493-f532-4776-a5c2-f975b2b2ea91',
    'description': 'updated loadbalancer',
    'name': 'update name',
    'admin_state_up': false,
  };
  client.updateLoadbalancer(options, function(err, lbs) {
    if (err) {
      console.log(err);
    } else {
      console.log('success', lbs);
    }
  });
});
