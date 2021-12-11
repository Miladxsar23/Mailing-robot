const _roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
/* first create correct data structure -> Graph */
function getGraph(array) {
  const graphRoad = Object.create(null);
  function addNode(from, to) {
    if (graphRoad[from]) graphRoad[from].push(to)
    else graphRoad[from] = [to]
  }

  for (let [from, to] of array.map(item => item.split("-"))) {
    addNode(from, to);
    addNode(to, from)
  }
  return graphRoad;
}
const _graphRoad = getGraph(_roads);
console.log(_graphRoad)
exports.getGraph = {getGraph, _graphRoad} ;
