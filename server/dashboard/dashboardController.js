const fs = require("fs");
const path = require("path");

function jsonData(req, successCB, errorCB) {
  if (req.params.role === "team") {
    let teamJSON = fs.readFileSync(path.join(__dirname, `../data/team.json`), {
      encoding: "utf-8"
    });
    successCB(teamJSON);
  } else if (req.params.role === "individual") {
    let individualJSON = fs.readFileSync(
      path.join(__dirname, `../data/individual.json`),
      {
        encoding: "utf-8"
      }
    );
    successCB(individualJSON);
  } else {
    errorCB("Error in fetching data");
  }
}

function rulesJSON(req, successCB, errorCB) {
  if (req.params.role === "team") {
    let teamJSON = fs.readFileSync(
      path.join(__dirname, `../data/rule_team.json`),
      {
        encoding: "utf-8"
      }
    );
    successCB(teamJSON);
  } else if (req.params.role === "individual") {
    let individualJSON = fs.readFileSync(
      path.join(__dirname, `../data/rule_individual.json`),
      {
        encoding: "utf-8"
      }
    );
    successCB(individualJSON);
  } else {
    errorCB("Error in fetching data");
  }
}

resetYAML = async (req, successCB, errorCB) => {
  if (req.params.role === "team") {
    await fs.unlinkSync(path.join(__dirname, `../data/rule_team.yml`));
    fs.copyFile(
      path.join(__dirname, "../backup_data/rule_team.yml"),
      path.join(__dirname, "../data/rule_team.yml"),
      err => {
        if (err) throw err;
        successCB("Reset success");
      }
    );
  } else if (req.params.role === "individual") {
    await fs.unlinkSync(path.join(__dirname, `../data/rule_individual.yml`));
    fs.copyFile(
      path.join(__dirname, "../backup_data/rule_individual.yml"),
      path.join(__dirname, "../data/rule_individual.yml"),
      err => {
        if (err) throw err;
        successCB("Reset success");
      }
    );
  } else {
    errorCB("Error in resetting data");
  }
};

module.exports = {
  jsonData: jsonData,
  rulesJSON: rulesJSON,
  resetYAML: resetYAML
};
