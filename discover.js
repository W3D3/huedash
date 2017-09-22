"use strict";

var huejay = require('huejay');

console.log('Discovering bridges...');

huejay.discover()
  .then(bridges => {
    if (!bridges.length) {
      console.log('- No bridges found');
      return;
    }

    var onlybridge;

    for (var bridge of bridges) {
      console.log(`- Id: ${bridge.id}, IP: ${bridge.ip}`);
        onlybridge = bridge;
    }

    var client = new huejay.Client({
      host: onlybridge.ip,
      port: 80, // Optional
      timeout: 15000 // Optional, timeout in milliseconds (15000 is the default)
    });

    var user = new client.users.User;

    // Optionally configure a device type / agent on the user
    user.deviceType = 'my_device_type'; // Default is 'huejay'

    client.users.create(user)
      .then(user => {
        console.log(`New user created - Username: ${user.username}`);
      })
      .catch(error => {
        if (error instanceof huejay.Error && error.type === 101) {
          return console.log(`Link button not pressed. Try again...`);
        }

        console.log(error.stack);
      });

  })
  .catch(error => {
    console.log(error.message);
  });
