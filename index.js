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
    res.write(JSON.stringify(data));
  } else {
    console.error("HTTP-Error: " + response.status);
  }
  res.end();
  return;
}

/*async function getGrid(req, res, data) {
  let location = JSON.parse(data);
  let url =
    "https://api.weather.gov/points/" + location.lat + "," + location.lon;

  let response = await fetch(url);
  if (response.ok) {
    json = await response.json();

  }


}
*/
http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api/location-request") {
      getLocationFromSearch(req, res, "Empire State Building");
    }
  })
  .listen(process.env.PORT || 3000);
