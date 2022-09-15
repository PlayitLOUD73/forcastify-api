var http = require("http");
http
  .createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    if (req.url === "/api") {
      res.write("API");
    }
    res.write("Success!");
    res.end();
  })
  .listen(process.env.PORT || 3000);
