"use strict"


// place positions
const places = {
  "Alice's House": { x: 279, y: 100 },
  "Bob's House": { x: 295, y: 203 },
  "Cabin": { x: 372, y: 67 },
  "Daria's House": { x: 183, y: 285 },
  "Ernie's House": { x: 50, y: 283 },
  "Farm": { x: 36, y: 118 },
  "Grete's House": { x: 35, y: 187 },
  "Marketplace": { x: 162, y: 110 },
  "Post Office": { x: 205, y: 57 },
  "Shop": { x: 137, y: 212 },
  "Town Hall": { x: 202, y: 213 }
}
const placeKeys = Object.keys(places)
const speed = 2;

function getCurrentPlace(imgEl, target) {
  const yOffset = imgEl.offsetTop;
  const xOffset = imgEl.offsetLeft;
  let { x, y } = places[target];
  return { x: x + xOffset, y: y + yOffset }
}

// helper function for create dom elements
function elt(type, props, ...childrens) {
  let elem = document.createElement(type);
  if (props) Object.assign(elem, props)
  for (let child of childrens) {
    if (typeof child === "string") elem.appendChild(document.createTextNode(child))
    else elem.appendChild(child)
  }
  return elem;
}

// Animation class
class Animation {
  constructor(worldState, robot, robotMemory) {
    this.worldState = worldState;
    this.robot = robot;
    this.robotMemory = robotMemory;
    this.turn = 0;
    this.node = document.querySelector(".main-village-wrapper");
    this.villageImageEl = document.querySelector(".main-village-wrapper-img");
    const robotEl = elt("div", { className: "robotElt" }, elt("img", {src:"../assets/robot_moving2x.gif"}))
    this.robotEl = robotEl;
    this.packets = [];
    this.node.appendChild(this.robotEl);

    this.updateView();
  }

  updateView() {
    this.robotEl.style.top = `${getCurrentPlace(this.villageImageEl, this.worldState.place).y - 38}px`;
    this.robotEl.style.left = `${getCurrentPlace(this.villageImageEl, this.worldState.place).x - 16}px`;
  }
}

exports.Animation = Animation;
