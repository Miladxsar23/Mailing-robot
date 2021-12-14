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
    this.robotEl = elt("div", { className: "robotElt" }, elt("img", {src:"../assets/robot_moving2x.gif"}));
    this.packets = [];
    this.work = elt("p", {}, "0");
    document.querySelector(".main-information-state-work").appendChild(this.work);
    this.node.appendChild(this.robotEl);
    this.robotEl.addEventListener("transitionend", () => this.updatePackets())
    this.btn_start = document.querySelector(".btn-start")
    this.btn_stop = document.querySelector(".btn-stop");
    this.btn_start.addEventListener("click", () => {
      this.schedule();
      this.robotEl.firstChild.src = "../assets/robot_moving2x.gif";
    })
    this.btn_stop.addEventListener("click", () => {
      this.clicked()
    })
    this.updateView();
    this.updatePackets();
    this.schedule();
  }

  updateView() {
    this.robotEl.style.top = `${getCurrentPlace(this.villageImageEl, this.worldState.place).y - 38}px`;
    this.robotEl.style.left = `${getCurrentPlace(this.villageImageEl, this.worldState.place).x - 16}px`;
    this.work.textContent = this.turn.toString();
  }

  updatePackets() {
    while(this.packets.length) this.packets.pop().remove();
    let heights = Object.create(null)
    for(let {place, address} of this.worldState.packets) {
      let {x, y} = getCurrentPlace(this.villageImageEl, place);
      let height = heights[place] || (heights[place] = 0);
      heights[place] += 14;
      let offset = placeKeys.indexOf(address) * 16;
      let p = elt("div", {className : "packet"});
      p.style.backgroundPosition = `0px ${0 - offset}px`;
      if(place === this.worldState.place) {
        p.style.left = "25px";
        p.style.bottom = `${20 + height}px`;
        this.robotEl.appendChild(p);
      }else {
        p.style.left = x + "px";
        p.style.top = y - 25 - height + "px";
        this.node.appendChild(p)
      }
      this.packets.push(p);
    }
   }
   tick() {
      let {direction, memory} = this.robot(this.worldState, this.robotMemory);
      this.worldState = this.worldState.move(direction);
      this.robotMemory = memory;
      this.turn++;
      this.updateView();
      if(this.worldState.packets.length === 0) {
        this.work.textContent = "mission complete!";
        this.robotEl.firstChild.src = "../assets/robot_idle.png";
        this.timeout = null;
      }else {
        this.schedule();
        this.robotEl.firstChild.src = "../assets/robot_moving2x.gif";
      }
   }
   schedule(){
     this.timeout = setTimeout(() => {
      this.tick();
     }, 500)
   }
   clicked() {
     window.clearTimeout(this.timeout)
     this.timeout = null;
     this.robotEl.firstChild.src = "../assets/robot_idle.png";
   }
}

exports.Animation = Animation;
