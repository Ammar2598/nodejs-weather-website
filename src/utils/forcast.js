const request = require("request");

const forecast = (latitude, longtude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=38fa6ac893e04548d89f57c9c75d4479&query=" +
    latitude +
    "," +
    longtude;
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          "  .the temprature degree is " +
          body.current.temperature +
          " degress.and it feels like " +
          body.current.feelslike +
          " degress.and the humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};
module.exports = forecast;
