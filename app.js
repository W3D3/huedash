/**
* Hue Dash
* nodejs implementation of a dash button powered hue toggle
* (C) 2017 Christoph Wedenig
* version 0.1 (21.September 2017)
**/

const huejay = require('huejay');
const dash_button = require('node-dash-button');

const mac = require('./config/config.json').dashmac;
const hueconf = require('./config/config.json').hue;


let client = new huejay.Client({
  host: hueconf.ip,
  port: 80, // Optional
  username: hueconf.username,
  timeout: 15000, // Optional, timeout in milliseconds (15000 is the default)
});



var dash = dash_button(mac, null, null, "all"); //address from step above
console.log("Listening for DashButton...");

dash.on("detected", function (){
  console.log("Button pressed");
  toggleGroup(hueconf.groupname);
});

// functions below

function toggleGroup(groupname) {

  client.groups.getAll()
    .then(groups => {
      for (let group of groups) {

        if (group.name == groupname) {
          console.log("Found " + hueconf.groupname);
          console.log('  Light Ids: ' + group.lightIds.join(', '));
          if (group.anyOn) { //turn em off again

            for (let id of group.lightIds) {
              turnLightOff(id);
            }
          } else {
            for (let id of group.lightIds) {
              turnLightOn(id);
            }
          }
        }
      }
    });


}

function turnLightOn(id) {
  client.lights.getById(id)
    .then(light => {

      light.on = true
      // light.brightness = 254;
      // light.hue = 32554;
      // light.saturation = 254;

      return client.lights.save(light);
    })
    .then(light => {
      console.log(`Turned on [${light.id}]`);
    })
    .catch(error => {
      console.log('Something went wrong');
      console.log(error.stack);
    });
}

function turnLightOff(id) {
  client.lights.getById(id)
    .then(light => {

      light.on = false
      // light.brightness = 254;
      // light.hue = 32554;
      // light.saturation = 254;

      return client.lights.save(light);
    })
    .then(light => {
      console.log(`Turned off light [${light.id}]`);
    })
    .catch(error => {
      console.log('Something went wrong');
      console.log(error.stack);
    });
}
