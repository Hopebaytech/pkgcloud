var pkgcloud = require('../../lib/pkgcloud');
var KH_admin_tenantID = '6ade8ae8037b4e449a4c7c7a65dc5e1b';
var client = pkgcloud.network.createClient({
  provider: 'openstack',
  tenantId: KH_admin_tenantID,
  token: '962e1f6775e54d7d8c467641ee18fe9d',
  region: 'RegionOne',
  authUrl: 'http://172.16.31.1:35357',
  strictSSL: false
});


var options = '68ec6c96-b62c-411e-8b59-5e142a4f2679';
client.destroyListener(options, function(err, listener) {
  if (err) {
    console.log(err);
  }
  console.log(listener);
});
