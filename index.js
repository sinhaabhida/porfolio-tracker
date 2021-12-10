var express = require("express");
const fs = require('fs');
var app = express();
const { getAllTrades, insertTrade, modifyTrade, removeTrade } = require('./controllers/tradeController');
const { getOverview, getReturns } = require('./controllers/portfolioController');
const bodyParser = require('body-parser');
const readMe = fs.createReadStream('./readme.md');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.listen(port, () => {
 console.log("Server running on port 3000");
});

// Introductory Route
app.get("/", (req, res) => {
  fs.createReadStream('./readme.md').pipe(res);
});

// Trade related routes
app.get("/trade/list", getAllTrades);
app.post("/trade", insertTrade);
app.patch("/trade", modifyTrade);
app.delete("/trade/:id", removeTrade);

// Portfolio related routes
app.get("/portfolio/overview", getOverview);
app.get("/portfolio/returns", getReturns);
