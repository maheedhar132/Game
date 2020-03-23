import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import FeedContent from "./LeaderBoardFeed";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  // componentWillUpdate = () => {
  //   console.log("this.props", this.props.defaultActive);
  // };

  handleFeedClick = name => {
    let selected = [];
    selected.push(name);
    this.setState({
      selected
    });
    this.props.handleClick(name);
  };

  render() {
    return (
      <Card
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          boxShadow: "none"
        }}
      >
        <Card.Content
          style={{
            textAlign: "center",
            padding:
              this.props.boardName === "Team Board" ? "0%" : "7px 12px 5px 7px",
            overflowY: this.props.boardName === "Team Board" ? "none" : "scroll"
          }}
        >
          {Object.keys(this.props.data).length > 0
            ? this.props.data.map((item, index) => {
                let details =
                  this.props.boardName === "Team Board"
                    ? {
                        index:
                          this.props.sortOrder === "Top to Bottom"
                            ? index + 1
                            : this.props.data.length - index,
                        name: item.name,
                        teamStrength: item.teamStrength,
                        score: item.points,
                        avatar: item.avatar
                      }
                    : {
                        index:
                          this.props.sortOrder === "Top to Bottom"
                            ? index + 1
                            : this.props.data.length - index,
                        name: item.name,
                        team: item.team,
                        score: item.points,
                        avatar: item.avatar
                      };
                return (
                  <FeedContent
                    details={details}
                    boardName={this.props.boardName}
                    handleFeedClick={this.handleFeedClick}
                    selected={this.state.selected}
                    defaultTeamName={this.props.data[0].name}
                  />
                );
              })
            : null}
        </Card.Content>
      </Card>
    );
  }
}
