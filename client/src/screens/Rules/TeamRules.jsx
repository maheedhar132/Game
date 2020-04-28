import React, { Component } from "react";
import {
  Grid,
  Divider,
  Dimmer,
  Segment,
  Header,
  Input,
  Button,
  Loader
} from "semantic-ui-react";
import LandingPage from "./../LandingPage/LandingPage.jsx";
import Rules from "../../components/Rules";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/loader.css";

export default class TeamRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamRules: {},
      openModal: false,
      loading: true,
      loaderContent: "Loading...",
      newRule: {
        name: "Test",
        metric: "No. of tests executed",
        threshold: 0.8,
        mName: "testsExec",
        operator: "gt",
        reward: 10
      }
    };
  }

  componentDidMount() {
    this.dataFetching();
  }

  dataFetching = () => {
    axios
      .get("/api/dashboard/rules/team")
      .then(response => {
        let { data } = response;
        let ds = typeof data === "string" ? JSON.parse(data) : data;
        this.setState({
          loading: false,
          teamRules: ds
        });
      })
      .catch(error => {
        return error;
      });
  };

  // add a rule
  addRule() {
    let rule = [];
    rule.push(this.state.newRule);
    this.setState({
      openModal: false,
      loaderContent: "Applying rule",
      loading: true
    });
    axios
      .post("/api/addRule", {
        rule,
        role: "team"
      })
      .then(response => {
        if (response) {
          this.setState({
            loading: false,
            loaderContent: "Loading..."
          });
          this.successAlert("Rule applied successfully");
          this.dataFetching();
        }
      })
      .catch(error => {
        this.failureAlert("Rule appliction failed");
        return error;
      });
  }



/*qualityRiskCheck = () => {

console.log("Quality risk check executed")

}
*/







  resetData = () => {
   //this.qualityRiskCheck();
    
    axios
      .get("/api/dashboard/reset/team")
      .then(response => {
        if (response.data === "Reset success") {
          axios
            .get("/api/calculate")
            .then(response => {
              if (response.data === "Calculation success") {
                this.setState({
                  loading: false,
                  loaderContent: "Loading..."
                });
                this.successAlert("Data reset success");
                this.dataFetching();
              }
            })
            .catch(error => {
              this.failureAlert("Data reset failed");
              return error;
            });
        }
      })
      .catch(error => {
        this.failureAlert("Data reset failed");
        return error;
      });
  };

  successAlert(message) {
    toast.success(message);
  }

  failureAlert(message) {
    toast.warn(message);
  }

  render() {
    let { teamRules, newRule } = this.state;
    return (
      <LandingPage activeName="teamRules">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} style={{ float: "left" }}>
              <h4>TEAM RULES</h4>
            </Grid.Column>
            <Grid.Column
              width={8}
              style={{ float: "left", position: "absolute", right: "-31%" }}
            >
              <Button
                primary
                onClick={() => {
                  this.setState({
                    openModal: true
                  });
                }}
              >
                Add Rule
              </Button>
              <Button primary onClick={this.resetData}>
                Reset
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row style={{ height: "85vh" }}>
            <Rules data={teamRules} />
          </Grid.Row>
        </Grid>
        <Dimmer active={this.state.openModal}>
          <Segment
            style={{
              color: "black",
              width: "50%",
              height: "78%",
              float: "right",
              marginTop: "5%",
              marginRight: "20%"
            }}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header
                    icon="write"
                    content="Add Rule"
                    style={{ marginLeft: "35%", marginTop: "0%" }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Rule name:</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input placeholder="Rule name" value={newRule.name} />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Rule Description</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input
                    placeholder="Rule Description"
                    value={newRule.metric}
                  />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Metric name:</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input placeholder="Metric name" value={newRule.mName} />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Operator</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input placeholder="Operator" value={newRule.operator} />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Threshold</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input placeholder="Threshold" value={newRule.threshold} />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={4}>
                  <p style={{ textAlign: "left" }}>Reward</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Input placeholder="Reward" value={newRule.reward} />
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Button primary onClick={this.addRule.bind(this)}>
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({
                        openModal: false
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Dimmer>
        <Dimmer active={this.state.loading} inverted>
          {this.state.loaderContent === "Applying rule" ? (
            <div className="loader">
              <ul className="ulClass">
                <li className="liClass" />
                <li className="liClass" />
                <li className="liClass" />
                <li className="liClass" />
              </ul>
              <p id="textContent">
                Applying the rule.
                <br /> Please wait for some time.
              </p>
              <br />
            </div>
          ) : (
            <Loader style={{ marginLeft: "8%" }}>Loading.....</Loader>
          )}
        </Dimmer>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </LandingPage>
    );
  }
}
