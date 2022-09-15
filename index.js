var PAT = process.env.LocationIQKey;

import fetch from "node-fetch";
import http from "http";

async function getLocationFromSearch(props) {
  let url =
    "https://us1.locationiq.com/v1/search?key=" +
    PAT +
    "&q=" +
    props +
    "&format=json";
  let response = await fetch(url);
  if (response.ok) {
    var json = await response.json();
    console.log(json[0].lat + "\n" + json[0].lon);
    var ret = "{lat: " + json[0].lat + ", long: " + json[0].lon + "}";
  } else {
    console.error("HTTP-Error: " + response.status);
  }

  return ret;
}

http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api/location-request") {
      var json = getLocationFromSearch("206 Green Chase W");
      res.write(json);
    }
    res.end();
  })
  .listen(process.env.PORT || 3000);
