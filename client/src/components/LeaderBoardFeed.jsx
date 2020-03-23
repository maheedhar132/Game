import React, { Component } from "react";
import { Feed, Card, Segment, Image } from "semantic-ui-react";
import "../styles/arrow.css";
import _ from "lodash";

class FeedContent extends Component {
  render() {
    let { boardName, selected, details, defaultTeamName } = this.props;
    let { index, name, score, team, teamStrength, avatar } = details;
    return (
      <Card style={{ width: "100%" }}>
        <Feed
          className={
            selected.length > 0
              ? _.includes(selected, name)
                ? "active"
                : ""
              : defaultTeamName === name
              ? "active"
              : ""
          }
          style={{
            padding: "3%",
            textAlign: "center",
            cursor: "pointer",
            height: "75px"
          }}
          onClick={() => {
            this.props.handleFeedClick(name);
          }}
        >
          <Feed.Event>
            <Segment
              style={{
                width: "18%",
                margin: "-3.1% 3% -3.2% -3.3%",
                padding: "5%",
                borderBottom: "none",
                borderLeft: "none",
                borderTop: "none",
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                textAlign: "center",
                height: "75px",
                fontSize: "16px"
              }}
            >
              <p style={{ paddingTop: "6%" }}>{index}</p>
            </Segment>
            <Image src={require("./../images/" + avatar + ".png")} />
            <Feed.Content style={{ marginLeft: "4%", marginTop: ".7%" }}>
              <Feed.Summary style={{ fontSize: "14px" }}>
                <Feed.User style={{ color: "black", fontWeight: "bold" }}>
                  {name}
                </Feed.User>{" "}
              </Feed.Summary>
              <Feed.Meta style={{ margin: "0%", fontSize: "13px" }}>
                {boardName === "Team Board" ? (
                  <Feed.Like>{"Team Strength : " + teamStrength}</Feed.Like>
                ) : (
                  <Feed.Like>{"Team : " + team}</Feed.Like>
                )}
              </Feed.Meta>
            </Feed.Content>
            <Segment
              style={{
                width: "25%",
                margin: "-3.1% -3% -3.2% -3.3%",
                paddingTop: "5%",
                paddingLeft: "7%",
                borderBottom: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                height: "75px",
                fontSize: "16px"
              }}
            >
              <p style={{ paddingTop: "6%", float: "left" }}>{score}</p>
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
  }
}

export default FeedContent;
