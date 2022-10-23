const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW1tYXIyNTk4IiwiYSI6ImNsOWZxczN0NjBhZjg0Mm84b291YXloa3YifQ.pltvrg8gq2COe4ppOR77FQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("cant connect location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
