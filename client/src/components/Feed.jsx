import React, { Component } from "react";
import { Feed, Card, Image } from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";

class FeedContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualBoardData: {}
    };
  }

  componentDidMount() {
    axios
      .get("/api/dashboard/details/individual")
      .then(response => {
        let { data } = response;
        let ds = typeof data === "string" ? JSON.parse(data) : data;
        this.setState({
          individualBoardData: ds
        });
      })
      .catch(error => {
        return error;
      });
  }

  render() {
    let { individualBoardData } = this.state;

    let users = _.filter(individualBoardData, { team: this.props.teamName });

    if (users) {
      return (
        <Card
          style={{
            background: "transparent",
            boxShadow: "none",
            float: "left",
            width: "100%",
            height: "100%",
            marginLeft: "-3%",
            marginTop: "-4%"
          }}
        >
          <Card.Content
            style={{
              overflowY: "scroll"
            }}
          >
            {users.map((data, index) => {
              return (
                <div>
                  <Feed
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      marginLeft: "2%"
                    }}
                  >
                    <Feed.Event>
                      <Image
                        avatar
                        style={{ fontSize: "18px" }}
                        src={require("./../images/" + data.avatar + ".png")}
                      />
                      <Feed.Content
                        style={{
                          marginLeft: "4%",
                          marginTop: "1%",
                          fontSize: "14px"
                        }}
                      >
                        <Feed.Summary>
                          <Feed.User style={{ color: "black" }}>
                            {data.name}
                          </Feed.User>{" "}
                        </Feed.Summary>
                        <Feed.Meta style={{ margin: "0%" }}>
                          <Feed.Like>{data.points} points</Feed.Like>
                        </Feed.Meta>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </div>
              );
            })}
          </Card.Content>
        </Card>
      );
    } else {
      return (
        <p style={{ color: "black", textAlign: "center", marginTop: "20%" }}>
          No members
        </p>
      );
    }
  }
}

export default FeedContent;
