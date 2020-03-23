import React, { Component } from "react";
import {
  Grid,
  Card,
  Divider,
  Dropdown,
  Loader,
  Dimmer
} from "semantic-ui-react";
import LeaderBoard from "../../components/LeaderBoard";
import TeamProfile from "../../components/TeamProfile";
import LandingPage from "./../LandingPage/LandingPage.jsx";
import _ from "lodash";
import axios from "axios";

const options = [
  {
    key: "Top to Bottom",
    text: "Top to Bottom",
    value: "Top to Bottom"
  },
  { key: "Bottom to Top", text: "Bottom to Top", value: "Bottom to Top" }
];

export default class TeamDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamBoardData: {},
      teamData: null,
      sortOrder: "Top to Bottom",
      loading: true
    };
  }

  componentWillMount() {
    axios
      .get("/api/dashboard/details/team")
      .then(response => {
        let { data } = response;
        let ds = typeof data === "string" ? JSON.parse(data) : data;
        this.setState({
          teamBoardData: _.orderBy(ds, ["points"], ["desc"]),
          teamData: _.orderBy(ds, ["points"], ["desc"])[0],
          loading: false
        });
      })
      .catch(error => {
        return error;
      });
  }

  handleClick = name => {
    let data = _.find(this.state.teamBoardData, { name });
    this.setState({
      teamData: data
    });
  };

  sort = (e, a) => {
    let { teamBoardData } = this.state;
    let sortOrder = a.value;
    if (sortOrder === "Top to Bottom") {
      this.setState({
        teamBoardData: _.orderBy(teamBoardData, ["points"], ["desc"]),
        sortOrder
      });
    } else if (sortOrder === "Bottom to Top") {
      this.setState({
        teamBoardData: _.orderBy(teamBoardData, ["points"], ["asc"]),
        sortOrder
      });
    }
  };

  render() {
    return (
      <LandingPage activeName="teamDashBoard">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={8} style={{ float: "left" }}>
              <h4>TEAM LEADERBOARD</h4>
            </Grid.Column>
            <Grid.Column
              width={8}
              style={{ position: "absolute", right: "-32%" }}
            >
              Sort By:{"  "}
              <Dropdown
                placeholder={options[0].text}
                options={options}
                onChange={this.sort}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row style={{ height: "82.5vh" }}>
            <Grid.Column>
              <LeaderBoard
                boardName="Team Board"
                data={this.state.teamBoardData}
                handleClick={this.handleClick}
                sortOrder={this.state.sortOrder}
              />
            </Grid.Column>
            <Grid.Column>
              <Card
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                <Card.Content
                  style={{
                    textAlign: "center",
                    marginTop: "27%",
                    color: "grey"
                  }}
                >
                  <TeamProfile data={this.state.teamData} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Dimmer active={this.state.loading} inverted>
          <Loader>Loading.....</Loader>
        </Dimmer>
      </LandingPage>
    );
  }
}
