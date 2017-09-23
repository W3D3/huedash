/**
* Hue Dash
* nodejs implementation of a dash button powered hue toggle
* (C) 2017 Christoph Wedenig
* version 0.1 (21.September 2017)
**/

const dash_button = require('node-dash-button');
const chalk = require('chalk');
var schedule = require('node-schedule');

const HueUtility = require('./HueUtility');
const DeviceDiscovery = require('./DeviceDiscovery');

// add timestamps in front of log messages
require('console-stamp')(console, '[HH:MM:ss.l]');

//load config from file
const mac = require('../config/config.json').dashmac;
const hueconf = require('../config/config.json').hue;

const myHue = new HueUtility(hueconf);

var dash = dash_button(mac, null, null, "all"); //address from step above
console.info(chalk.blue("Listening for DashButton..."));

//Button pressed
dash.on("detected", function (){
  console.info(chalk.bold.black.bgCyan("Button pressed"));
  myHue.toggleGroup(hueconf.groupname);
});

// DeviceDiscovery.scanForDevices(['38:ca:da:b2:29:22'], function (found) {
//   console.log(JSON.stringify(found));
// });

//every 5 minutes we check for known devices
var j = schedule.scheduleJob('*/1 * * * *', function(){
  DeviceDiscovery.scanForDevices(['38:ca:da:b2:29:22'], function (found) {
    console.log(JSON.stringify(found));
  });

});
