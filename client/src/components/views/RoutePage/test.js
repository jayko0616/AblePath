const data = require('./example.json');

const list = data.metaData.plan.itineraries[0];

//console.log(list.legs[0]);
console.log(list.legs.length);