const huejay = require('huejay');

class HueUtility {

  constructor(hueconf) {
    this.groupname = hueconf.groupname;

    this.client = new huejay.Client({
      host: hueconf.ip,
      port: 80, // Optional
      username: hueconf.username,
      timeout: 15000, // Optional, timeout in milliseconds (15000 is the default)
    });
  }

  toggleGroup(groupname) {
    this.client.groups.getAll()
      .then(groups => {
        for (let group of groups) {

          if (group.name == this.groupname) {
            console.log("Found " + this.groupname);
            console.log('Associated Lights: ' + group.lightIds.join(', '));
            if (group.anyOn) { //turn em off again

              for (let id of group.lightIds) {
                this.turnLightOff(id);
              }
            } else {
              for (let id of group.lightIds) {
                this.turnLightOn(id);
              }
            }
          }
        }
      });
  }

  turnLightOn(id) {

    this.client.lights.getById(id)
      .then(light => {

        light.on = true
        // light.brightness = 254;
        // light.hue = 32554;
        // light.saturation = 254;

        return this.client.lights.save(light);
      })
      .then(light => {
        console.log(`Turned on [${light.id}]`);
      })
      .catch(error => {
        console.log('Something went wrong');
        console.log(error.stack);
      });
  }

  turnLightOff(id) {
    this.client.lights.getById(id)
      .then(light => {

        light.on = false

        return this.client.lights.save(light);
      })
      .then(light => {
        console.log(`Turned off light [${light.id}]`);
      })
      .catch(error => {
        console.log('Something went wrong');
        console.log(error.stack);
      });
  }
}
module.exports = HueUtility;
