/**
* Hue Dash
* nodejs implementation of a dash button powered hue toggle
* (C) 2017 Christoph Wedenig
* version 0.1 (21.September 2017)
**/
const dash_button = require('node-dash-button');

const mac = require('./config/config.json').dashmac;
const hueconf = require('./config/config.json').hue;

const HueUtility = require('./hue');
console.log(HueUtility);

const myHue = new HueUtility(hueconf);

var dash = dash_button(mac, null, null, "all"); //address from step above
console.log("Listening for DashButton...");

dash.on("detected", function (){
  console.log("Button pressed");
  myHue.toggleGroup(hueconf.groupname);
});
