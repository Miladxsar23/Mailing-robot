const {_graphRoad} = require('./_createGraph').getGraph;
/* create a random robot -> first way  */
function randomPick(array) {
  let item = Math.floor(Math.random() * array.length);
  return array[item]
}

function randomRobot(state) {
  return { direction: randomPick(_graphRoad[state.place]) };
}

exports.random = {randomRobot, randomPick};
