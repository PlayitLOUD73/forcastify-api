const PAT = process.env.LocationIQKey;

import fetch from "node-fetch";
import http from "http";

async function getLocationFromSearch(req, res, address) {
  let url =
    "https://us1.locationiq.com/v1/search?key=" +
    PAT +
    "&q=" +
    address +
    "&format=json";
  let response = await fetch(url);
  let json;
  let data;
  if (response.ok) {
    json = await response.json();
    console.log(json[0].lat + "\n" + json[0].lon);
    data = { lat: json[0].lat, lon: json[0].lon };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  } else {
    console.error("HTTP-Error: " + response.status);
  }
  req.end();
  return;
}

http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api/location-request") {
      getLocationFromSearch(req, res, "Empire State Building");
    }
  })
  .listen(process.env.PORT || 3000);
