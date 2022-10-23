const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");
const app = express();

//define paths for Express congig
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//set handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
//setup a static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ammar",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ammar Yasser",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is helpful text",
    title: "help",
    name: "Ammar Yasser",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      mgs: "you must provide an address!",
    });
  }
  //geocode
  geocode(req.query.address, (error, { latitude, longtude, location } = {}) => {
    if (error) {
      res.send({ error });
    }
    forcast(latitude, longtude, (error, forcastData) => {
      if (error) {
        res.send({ error });
      }
      res.send({
        forcast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "help article not found",
    title: "404",
    name: "Ammar Yasser",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    msg: "Page not found",
    title: "404",
    name: "Ammar Yasser",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
