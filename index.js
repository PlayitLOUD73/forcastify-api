var PAT = process.env.LocationIQKey;

const fetch = require("node-fetch");

function getLocationFromSearch(props) {
  let url =
    "https://us1.locationiq.com/v1/search?key=" +
    PAT +
    "&q=" +
    props +
    "&format=json";
  let response = fetch(url);
  if (response.ok) {
    var json = response.json();
    console.log(json[0].lat + "\n" + json[0].lon);
  } else {
    alert("HTTP-Error: " + response.status);
  }

  return { lat: json[0].lat, lon: json[0].lon };
}

var http = require("http");
http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api/location-request") {
      res.write("API");
      getLocationFromSearch("206 Green Chase W");
    }
    res.write("Success!");
    res.end();
  })
  .listen(process.env.PORT || 3000);
