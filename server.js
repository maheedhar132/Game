const express = require("express");
const path = require("path");
const app = express();
const port = process.env.NODE_PORT || 5030;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectflash = require("connect-flash");
const morgan = require("morgan");
const yaml = require("js-yaml");
const YAML = require("json2yaml");
const fs = require("fs");

// create server
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
  dataCalculation(req, res);
});

// use middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(connectflash());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// logger
app.use(morgan("dev"));

// setup REST routes
app.post("/login", function(req, res) {});
// API calls
app.get("/api/calculate", (req, res) => {
  dataCalculation(req, res);

  res.send("Calculation success");
});

app.post("/api/addRule", function(req, res) {
  let ruleNew = req.body.rule;
  let oldRules = yaml.safeLoad(
    fs.readFileSync(
      path.join(__dirname, `./server/data/rule_${req.body.role}.yml`)
    )
  );
  oldRules.push(ruleNew[0]);
  fs.writeFileSync(
    `./server/data/rule_${req.body.role}.yml`,
    YAML.stringify(oldRules)
  );
  dataCalculation(req, res);
  res.send("success");
});

app.use("/api/dashboard", require(path.join(__dirname, "./server/dashboard"))); //When it is /api then it will go to getData

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  //   app.get("/api/calculate", require(path.join(__dirname, "./server/analyser")));
  // Handle React routing, return all requests to React app
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// setup mongoose connection

// let mongoURL = 'mongodb://127.0.0.1:27017/rig_db_dsc';

// mongoose.connect(mongoURL, {
//     useNewUrlParser: true
// });

// mongoose.connection.on('connected', function() {
//     console.log('mongoose is now connected to ', mongoURL);

//     mongoose.connection.on('error', function(err) {
//         console.error('error in mongoose connection: ', err);
//     });

//     mongoose.connection.on('disconnected', function() {
//         console.log('mongoose is now disconnected.');
//     });

//     process.on('SIGINT', function() {
//         mongoose.connection.close(function() {
//             console.log('mongoose disconnected on process termination');
//             process.exit(0);
//         });
//     });
// });

let dataCalculation = (req, res) => {
  var teamsJSON = [];

  var userJson = [];
  var inputfile = "./server/data/rule_team.yml",
    outputfile = "./server/data/rule_team.json";

  obj = yaml.load(
    fs.readFileSync(inputfile, {
      encoding: "utf-8"
    })
  );
  // this code if you want to save
  fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));

  var inputfile1 = "./server/data/rule_individual.yml",
    outputfile2 = "./server/data/rule_individual.json";

  obj = yaml.load(
    fs.readFileSync(inputfile1, {
      encoding: "utf-8"
    })
  );
  // this code if you want to save
  fs.writeFileSync(outputfile2, JSON.stringify(obj, null, 2));

  var contents = fs.readFileSync("./server/data/rule_team.json");
  var jsonContent = JSON.parse(contents);
  var contents_ind = fs.readFileSync("./server/data/rule_individual.json");
  var jsonContent_ind = JSON.parse(contents_ind);

  let dataSource_team = JSON.parse(
    fs.readFileSync("./server/data/team_ds.json")
  );

  let dataSource_individual = JSON.parse(
    fs.readFileSync("./server/data/individual_ds.json")
  );

  var teams = Object.keys(dataSource_team);
  var users = Object.keys(dataSource_individual);

  calculate(jsonContent, teams, dataSource_team);
  jsonTeams(teams, teamsJSON, dataSource_team);
  calculate_user(jsonContent_ind, dataSource_individual, users);
  jsonUser(users, userJson, dataSource_individual);
};

let calculate = (jsonContent, teams, dataSource_team) => {
  let rnge = 0;
  var strength = 0;
  jsonContent.map(metric => {
    var mName = metric.mName;
    var threshold = metric.threshold;
    var reward = metric.reward;
    var operator = metric.operator;
    teams.map(team => {
      let key = dataSource_team[team].metrics.map(something => {
        return something;
      });
      let score = 0;

      if (
        key.filter(something => Object.keys(something).includes(mName)).length >
        0
      ) {
        let value = key.filter(something => mName == Object.keys(something))[0][
          mName
        ];
        if (Array.isArray(value)) {
          dataSource_team[team].teamStrength = value.length;
          value.map(item => {
            if (operator == "gt") {
              if (item >= threshold) {
                score = reward + dataSource_team[team].currentScore;
                dataSource_team[team].achievements.push({
                  metric: metric.metric,
                  reward
                });
                dataSource_team[team].currentScore = score;
              }
            }
          });
        } else {
          if (operator == "gt") {
            if (value >= threshold) {
              score = reward + dataSource_team[team].currentScore;
              dataSource_team[team].achievements.push({
                metric: metric.metric,
                reward
              });
              dataSource_team[team].currentScore = score;
            }
          } else if (operator == "le") {
            if (threshold > value) {
              score = reward + dataSource_team[team].currentScore;
              dataSource_team[team].achievements.push({
                metric: metric.metric,
                reward
              });
              dataSource_team[team].currentScore = score;
            }
          }
        }
      }
    });
  });
};

let jsonTeams = (teams, teamsJSON, dataSource_team) => {
  teams.map(team => {
    let obj = {
      name: team,
      teamStrength: dataSource_team[team].teamStrength,
      badges: [],
      points: dataSource_team[team].currentScore,
      avatar: dataSource_team[team].avatar,
      achievements: dataSource_team[team].achievements
    };
    teamsJSON.push(obj);
    dataSource_team[team].currentScore = 0;
  });
  fs.writeFileSync(
    "./server/data/team.json",
    JSON.stringify(teamsJSON),
    "utf-8"
  );
};

let calculate_user = (jsonContent_ind, dataSource_individual, users) => {
  jsonContent_ind.map(metric => {
    var mName = metric.mName;
    var threshold = metric.threshold;
    var reward = metric.reward;
    var operator = metric.operator;
    users.map(user => {
      let key = dataSource_individual[user].metrics.map(something => {
        return something;
      });
      let score_user = 0;
      if (
        key.filter(something => Object.keys(something).includes(mName)).length >
        0
      ) {
        let value = key.filter(something => mName == Object.keys(something))[0][
          mName
        ];
        if (operator == "gt") {
          if (value >= threshold) {
            score_user = reward + dataSource_individual[user].currentScore;
            dataSource_individual[user].achievements.push({
              metric: metric.metric,
              reward
            });
            dataSource_individual[user].currentScore = score_user;
          }
        } else if (operator == "le") {
          if (threshold > value) {
            score_user = reward + dataSource_individual[user].currentScore;
            dataSource_individual[user].achievements.push({
              metric: metric.metric,
              reward
            });
            dataSource_individual[user].currentScore = score_user;
          }
        }
      }
    });
  });
};

let jsonUser = (users, userJson, dataSource_individual) => {
  users.map(user => {
    let obj = {
      name: user,
      team: dataSource_individual[user].teamName,
      badges: [],
      points: dataSource_individual[user].currentScore,
      avatar: dataSource_individual[user].avatar,
      achievements: dataSource_individual[user].achievements
    };
    userJson.push(obj);
    dataSource_individual[user].currentScore = 0;
  });
  fs.writeFileSync(
    "./server/data/individual.json",
    JSON.stringify(userJson),
    "utf-8"
  );
};
