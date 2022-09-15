import { getLocationFromSearch } from "../api";

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
