import React, { Component } from "react";
import {
  Grid,
  Card,
  Dropdown,
  Divider,
  Loader,
  Dimmer
} from "semantic-ui-react";
import LeaderBoard from "../../components/LeaderBoard";
import IndividualProfile from "../../components/IndividualProfile";
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

export default class IndividualDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualBoardData: {},
      userData: null,
      sortOrder: "Top to Bottom",
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("/api/dashboard/details/individual")
      .then(response => {
        let { data } = response;
        let ds = typeof data === "string" ? JSON.parse(data) : data;
        this.setState({
          individualBoardData: _.orderBy(ds, ["points"], ["desc"]),
          userData: _.orderBy(ds, ["points"], ["desc"])[0],
          loading: false
        });
      })
      .catch(error => {
        return error;
      });
  }

  sort = (e, a) => {
    let { individualBoardData } = this.state;
    let sortOrder = a.value;
    if (sortOrder === "Top to Bottom") {
      this.setState({
        individualBoardData: _.orderBy(
          individualBoardData,
          ["points"],
          ["desc"]
        ),
        sortOrder
      });
    } else if (sortOrder === "Bottom to Top") {
      this.setState({
        individualBoardData: _.orderBy(
          individualBoardData,
          ["points"],
          ["asc"]
        ),
        sortOrder
      });
    }
  };

  handleClick = name => {
    let data = _.find(this.state.individualBoardData, { name });
    this.setState({
      userData: data
    });
  };

  render() {
    return (
      <LandingPage activeName="individualDashBoard">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={8} style={{ float: "left" }}>
              <h5>INDIVIDUAL LEADERBOARD</h5>
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
                boardName="Individual Board"
                data={this.state.individualBoardData}
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
                  <IndividualProfile data={this.state.userData} />
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
