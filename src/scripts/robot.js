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



//test random robot
runRobot(VillageState.random(), randomRobot, []);

// test route robot
runRobot(VillageState.random(), routeRobot, []);

// test gps robot
runRobot(VillageState.random(), gpsRobot, []);

console.log(new Animation(VillageState.random(), gpsRobot, []))
