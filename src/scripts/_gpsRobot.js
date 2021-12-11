const {_graphRoad} = require('./_createGraph').getGraph;
/* third way -> GPS robot */
function findRoute(from, to, graph) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place === to) return route.concat(place)
      if (!work.some(w => w.at === place)) {
        work.push({ at: place, route: route.concat(place) })
      }
    }
  }
}

function gpsRobot({ place, packets }, route) {
  if (route.length === 0) {
    let packet = packets[0];
    if (packet.place === place) {
      route = findRoute(place, packet.address, _graphRoad);
    } else {
      route = findRoute(place, packet.place, _graphRoad);
    }
  }
  return { direction: route[0], memory: route.slice(1) }
}

exports.gpsRobot = gpsRobot;
