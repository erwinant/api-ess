const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

const timeout = require("connect-timeout"); //express v4
const fileUpload = require("express-fileupload");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
//Cors
app.use(cors());
app.options("*", cors());
//registering view
app.set("views", "views");
app.set("view engine", "pug");
// API file for interacting with api route
const api_account = require("./routes/raccount");
const api_area = require("./routes/rarea");
const api_workLocation = require("./routes/rworklocation");
const api_location = require("./routes/rlocation");
const api_absent = require("./routes/rabsence");
const api_enum = require("./routes/renum");
const api_employee = require("./routes/remployee");
const api_department = require("./routes/rdepartment");
const api_division = require("./routes/rdivision");
const api_organizationlevel = require("./routes/rorganizationlevel");
const api_message = require("./routes/rmessage");
const api_cuti = require("./routes/rcuti");
const api_claim = require("./routes/rclaim");
const api_approval = require("./routes/rapproval");
const api_spd = require("./routes/rspd");
const api_holiday = require("./routes/rholiday");
const api_cutibalance = require("./routes/rcutibalance");
// const cron_approval = require("./cron-approval");
const cron_absen = require("./cron-absen");

//fileupload
app.use(fileUpload());
// Parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist")));
// API location route
//secure the api with auth
const whiteUri = [
  "employee/temp/approve",
  "employee/temp/reject",
  "/account/login",
  "/account/register",
  "/account/resetpwd"
];
const auth = function(req, res, next) {
  //console.log("a");
  let uri = String(req.originalUrl);
  //let check = whiteUri.filter(m =>  uri.indexOf(m) >= 0)
  whiteUri.map(m => uri.indexOf(m) >= 0).find(f => f === true);
  //console.log(uri);
  if (whiteUri.map(m => uri.indexOf(m) >= 0).find(f => f === true)) next();
  else {
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      next();
    });
  }
};
app.use(auth);
//our route
app.use("/api/account", api_account);
app.use("/api/area", api_area);
app.use("/api/work-location", api_workLocation);
app.use("/api/location", api_location);
app.use("/api/cuti", api_cuti);
app.use("/api/claim", api_claim);
app.use("/api/absen", api_absent);
app.use("/api/enum", api_enum);
app.use("/api/employee", api_employee);
app.use("/api/division", api_division);
app.use("/api/department", api_department);
app.use("/api/organizationlevel", api_organizationlevel);
app.use("/api/message", api_message);
app.use("/api/approval", api_approval);
app.use("/api/spd", api_spd);
app.use("/api/holiday", api_holiday);
app.use("/api/cutibalance", api_cutibalance);
// app.use("/cron/approval", cron_approval);
app.use("/cron/absen", cron_absen);
app.use(timeout("150s"));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// var options = {

// }
// const { GraphQLSchema } = require('graphql');
// const graphqlHTTP = require('express-graphql');

// const { generateModelTypes, generateSchema } = require('sequelize-graphql-schema');
// const models = require('./models');
// //const types = generateModelTypes(models)
// console.log(generateSchema(models));
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: new GraphQLSchema(generateSchema(models)),
//         graphiql: true
//     })
// )

//Set Port
const port = "3005";
app.set("port", port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
