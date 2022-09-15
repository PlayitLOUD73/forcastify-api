var PAT = process.env.LocationIQKey;

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

export { getLocationFromSearch };
