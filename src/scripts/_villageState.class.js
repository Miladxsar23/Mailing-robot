"use strict"
const {randomPick} = require('./_randomRobot').random;
const {_graphRoad} = require('./_createGraph').getGraph;
/* create a VillageState class for control state of village */
class VillageState {
  constructor(place, packets) {
    this.place = place, this.packets = packets
  }
  /*
  *update state after movet to destination and return new state
  */
  move(destination) {
    if (!_graphRoad[this.place].includes(destination)) return this;
    let newPackets = this.packets.map(p => {
      if (p.place !== this.place) return p;
      else return { place: destination, address: p.address }
    }).filter(packet => {
      return packet.address !== packet.place;
    })
    return new VillageState(destination, newPackets)
  }
}

VillageState.random = function (packets = 5) {
  let initialPackets = [];
  let place, address;
  for (let i = 0; i < packets; i++) {
    address = randomPick(Object.keys(_graphRoad))
    do {
      place = randomPick(Object.keys(_graphRoad))
    } while (place == address)
    initialPackets.push({ place, address })
  }
  return new VillageState("Post Office", initialPackets)
}
exports.VillageState = VillageState;
