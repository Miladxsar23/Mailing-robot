"use strict"

import { format } from "util";

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

function getCurrentPlace(imgEl, placeKeys) {
  const yOffset = imgEl.offsetTop;
  const xOffset = imgEl.offsetLeft;
  const realPosition = Object.create(null);
  for (let p of placeKeys) {
    let { x, y } = places[p]
    realPosition[p] = { x: x + xOffset, y: y + yOffset }
  }
  return realPosition;
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
  constructor({place, packats}) {
    this.place = place;
    this.packats = packats;
  }
}
