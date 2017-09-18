var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use(express.static("Web/public"));

app.get("/", function(req, res) {
    res.render("../web/views/pages/index");
});


app.listen(5000);
console.log("Dashboard is now running");
