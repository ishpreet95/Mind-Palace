require("dotenv").config();

const app = require("./api/config/express");

const port = process.env.PORT;
app.listen(port, () => console.log("server running on port " + port));

module.exports = app;
