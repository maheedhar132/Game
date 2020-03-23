import React, { Component } from "react";
import { Card, Feed, Segment } from "semantic-ui-react";

export default class TeamRules extends Component {
  render() {
    return (
      <div style={{ overflowY: "scroll", height: "100%" }}>
        {Object.keys(this.props.data).length > 0
          ? this.props.data.map((rule, index) => {
              return (
                <Card
                  style={{
                    width: "48%",
                    float: "left",
                    height: "80px",
                    margin: "1%"
                  }}
                >
                  <Feed
                    style={{
                      textAlign: "center",
                      height: "80px"
                    }}
                  >
                    <Feed.Event>
                      <Segment
                        style={{
                          width: "10%",
                          paddingTop: "5%",
                          borderBottom: "none",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottomRightRadius: 0,
                          borderTopRightRadius: 0,
                          textAlign: "center",
                          height: "80px",
                          fontSize: "16px"
                        }}
                      >
                        <p style={{ paddingTop: "6%" }}>{index + 1}</p>
                      </Segment>
                      <Feed.Content style={{ margin: "1% 4%" }}>
                        <Feed.Summary style={{ fontSize: "14px" }}>
                          <Feed.User
                            style={{ color: "#1c4598", fontWeight: "bold" }}
                          >
                            {rule.metric}
                          </Feed.User>{" "}
                        </Feed.Summary>
                        <Feed.Meta style={{ margin: "0%", fontSize: "13px" }}>
                          <Feed.Like>{rule.name}</Feed.Like>
                        </Feed.Meta>
                        <Feed.Extra>Threshold : {rule.threshold}</Feed.Extra>
                      </Feed.Content>
                      <Segment
                        style={{
                          width: "20%",
                          margin: "0%",
                          paddingTop: "5%",
                          borderBottom: "none",
                          borderRight: "none",
                          borderTop: "none",
                          borderBottomLeftRadius: 0,
                          borderTopLeftRadius: 0,
                          height: "80px",
                          fontSize: "16px",
                          paddingLeft: "5%"
                        }}
                      >
                        <p style={{ fontSize: "18px", float: "left" }}>
                          {rule.reward}
                        </p>
                        <i
                          className="fas fa-coins"
                          style={{
                            fontSize: "18px",
                            paddingLeft: "13%",
                            paddingTop: "8%",
                            float: "left",
                            color: "#f3bf3d"
                          }}
                        />
                      </Segment>
                    </Feed.Event>
                  </Feed>
                </Card>
              );
            })
          : null}
      </div>
    );
  }
}
