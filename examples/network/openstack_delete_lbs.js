var pkgcloud = require('../../lib/pkgcloud');

var client = pkgcloud.network.createClient({
  provider: 'openstack',
  tenantId: 'e7a1864d6a9348f3a94fd32e3ebd1a36',
  token: 'f0ff40891f3f4e4bbb550621ebcfffc5',
  region: 'RegionOne',
  authUrl: 'http://controller:5000/',
  strictSSL: false
});
var options = '12ac7bc9-7937-4796-bb9d-683b75b89916';
client.destroyLoadbalancer(options, function (err, lbs) {
  if (err) {
    console.error(err);
  }else {
    console.log(lbs);
  }
});
