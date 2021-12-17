"use strict"
const {_graphRoad} = require('./_createGraph').getGraph;
const {VillageState} = require('./_villageState.class.js');
const {runRobot} = require('./_runRobot');
const {Animation} = require('./_animation');
// first robot -> random pick way
const {randomRobot} = require('./_randomRobot').random;
// second robot -> route robot
const {routeRobot} = require('./_routeRobot');
// third robot -> GPS robot
const {gpsRobot} = require('./_gpsRobot');


/*
//test random robot
runRobot(VillageState.random(), randomRobot, []);

// test route robot
runRobot(VillageState.random(), routeRobot, []);

// test gps robot
runRobot(VillageState.random(), gpsRobot, []);
*/
const robots = {gpsRobot : gpsRobot, routeRobot : routeRobot, random : randomRobot};
const robotSelect = document.querySelector(".main-information-robot-select");
const addPacket = document.querySelector(".main-information-add-form");


let app = new Animation(VillageState.random(10), gpsRobot, []);
robotSelect.addEventListener("change", function(e) {
  let rb = robots[e.target.value];
  app.robot = rb;
})
addPacket.addEventListener("submit", function(e) {
  e.preventDefault();
  let place = e.target.elements.from.value;
  let address = e.target.elements.to.value;
  app.worldState.packets.push({place, address})
  if(app.timeout === null) app.schedule()
})

