import React, { Component } from "react";
import { Grid, Divider, Icon, Image, Card } from "semantic-ui-react";

import FeedContent from "./Feed.jsx";

const achievements = [];

export default class IndividualProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMembers: false
    };
  }

  render() {
    let { data } = this.props;
    if (data) {
      return (
        <Grid>
          <Grid.Row style={{ marginTop: "-25%" }}>
            <Grid.Column>
              <Image
                size="tiny"
                src={require("./../images/" + data.avatar + ".png")}
              />
              <h3
                style={{
                  marginTop: "2%",
                  color: "black",
                  fontSize: "14px",
                  textTransform: "uppercase"
                }}
              >
                {data.name}
              </h3>
              <p style={{ marginTop: "-2%", fontSize: "14px" }}>
                Team : {data.team}
              </p>
              <p style={{ marginTop: "-1%", fontSize: "14px" }}>
                Level :{" "}
                {data.points > 80
                  ? 3
                  : data.points > 60
                  ? 2
                  : data.points > 40
                  ? 1
                  : 0}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "0%" }}>
            <Grid.Column>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "0%" }}>
            <Grid.Column>
              <p
                style={{
                  float: "left",
                  color: "black",
                  fontSize: "16px",
                  padding: "1% 0"
                }}
              >
                {data.points} Points
              </p>
              {this.state.viewMembers ? (
                <Icon
                  style={{ float: "right", cursor: "pointer" }}
                  name="angle up"
                  size="large"
                  onClick={() => {
                    this.setState({
                      viewMembers: false
                    });
                  }}
                />
              ) : (
                <Icon
                  style={{ float: "right", cursor: "pointer" }}
                  name="angle down"
                  size="large"
                  onClick={() => {
                    this.setState({
                      viewMembers: true
                    });
                  }}
                />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "0%", marginTop: "-2%" }}>
            <Grid.Column>
              <Divider />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {console.log("this.state.viewMembers", data.team)}
              {this.state.viewMembers ? (
                <Grid>
                  <Grid.Row style={{ padding: "0%" }}>
                    <Grid.Column>
                      <b
                        style={{
                          color: "black",
                          float: "left",
                          marginLeft: "1%",
                          fontSize: "14px"
                        }}
                      >
                        Achievements
                      </b>
                    </Grid.Column>
                  </Grid.Row>

                  {data.achievements.length ? (
                    <Grid.Row>
                      <Grid.Column>
                        <Card style={{ width: "100%", boxShadow: "none" }}>
                          <Card.Content>
                            <Grid>
                              <Grid.Row
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <Grid.Column width={8}>
                                  <p>Metric</p>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  <p>Rewards</p>
                                </Grid.Column>
                              </Grid.Row>
                              <Grid.Row style={{ overflowY: "scroll" }}>
                                <Grid.Column>
                                  <Grid
                                    style={{
                                      height: "20vh"
                                    }}
                                  >
                                    {data.achievements.map(val => {
                                      return (
                                        <Grid.Row>
                                          <Grid.Column width={8}>
                                            <p>{val.metric}</p>
                                          </Grid.Column>
                                          <Grid.Column width={8}>
                                            <p>{val.reward}</p>
                                          </Grid.Column>
                                        </Grid.Row>
                                      );
                                    })}
                                  </Grid>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid.Row>
                  ) : (
                    <h5 style={{ marginLeft: "39%" }}> No achievements </h5>
                  )}
                </Grid>
              ) : null}
            </Grid.Column>
          </Grid.Row>
          {!this.state.viewMembers ? (
            <Grid.Row style={{ height: "30vh" }}>
              <Grid.Column>
                <b
                  style={{
                    color: "black",
                    float: "left",
                    marginTop: "-5%",
                    paddingBottom: "5%",
                    marginLeft: "1%",
                    fontSize: "14px"
                  }}
                >
                  Team members
                </b>
                <FeedContent teamName={data.team} />
              </Grid.Column>
            </Grid.Row>
          ) : null}
        </Grid>
      );
    } else {
      return (
        <div>
          <Icon name="trophy" size="huge" color="grey" />
          <p>Select a member to see it's details here</p>
        </div>
      );
    }
  }
}
