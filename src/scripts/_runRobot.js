"use strict"
/* run robot is just a function */
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.packets.length === 0) {
      console.log(`end in turn ${turn}`)
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to turn ${turn}`)
  }
}
exports.runRobot = runRobot;
