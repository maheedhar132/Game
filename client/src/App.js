import React, { Component } from "react";
import history from "./history";
import TeamDashBoard from "./screens/DashBoard/TeamDashBoard.jsx";
import IndividualDashBoard from "./screens/DashBoard/IndividualDashBoard.jsx";
import TeamRules from "./screens/Rules/TeamRules.jsx";
import IndividualRules from "./screens/Rules/IndividualRules.jsx";

import { Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={TeamDashBoard} exact />
          <Route path="/teamDashBoard" component={TeamDashBoard} />
          <Route path="/individualDashBoard" component={IndividualDashBoard} />
          <Route path="/teamRules" component={TeamRules} />
          <Route path="/individualrules" component={IndividualRules} />
        </Switch>
      </Router>
    );
  }
}
