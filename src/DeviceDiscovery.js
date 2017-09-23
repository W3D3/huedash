var scanner = require('local-network-scanner');


class DeviceDiscovery {

  constructor() {

  }

  static scanForDevices(deviceMacList, callback)
  {
    scanner.scan(function(devices) {
        //console.log(devices);
        var found = [];
        for (var i = 0; i < devices.length; i++) {
          if(deviceMacList.includes(devices[i].mac))
          {
            //console.log(devices[i].mac);
            found.push(devices[i].mac);
          }
        }

        callback(found);
    });
  }

}
module.exports = DeviceDiscovery;
