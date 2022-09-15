var PAT = process.env.LocationIQKey;

import fetch from "node-fetch";
import http from "http";

async function getLocationFromSearch(address) {
  let url =
    "https://us1.locationiq.com/v1/search?key=" +
    PAT +
    "&q=" +
    address +
    "&format=json";
  let response = await fetch(url);
  let json;
  let ret;
  if (response.ok) {
    json = await response.json();
    console.log(json[0].lat + "\n" + json[0].lon);
    ret = { lat: json[0].lat, lon: json[0].lon };
  } else {
    console.error("HTTP-Error: " + response.status);
  }

  return ret;
}

http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api/location-request") {
      var json = getLocationFromSearch("Empire State Building");
      res.json(json);
    }
    res.end();
  })
  .listen(process.env.PORT || 3000);
