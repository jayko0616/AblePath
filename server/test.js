const secs = 5000;
var date;
if(secs < 3600) {
    date = new Date(secs * 1000).toISOString().substring(14, 19);
}
else {
    date = new Date(secs * 1000).toISOString().substring(11, 16);
}
console.log(date);