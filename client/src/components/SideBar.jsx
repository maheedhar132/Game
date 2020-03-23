import React, { Component } from "react";
import { Menu, Sidebar, Image } from "semantic-ui-react";
import "../styles/sideBar.css";
import history from "./../history";

class SidebarVisible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeName: this.props.activeName
    };
  }

  render() {
    return (
      <Sidebar.Pushable style={{ height: "100vh" }}>
        <Sidebar
          animation="overlay"
          visible
          style={{
            backgroundColor: "white",
            textAlign: "center",
            width: "14.5%"
          }}
        >
          <Menu
            secondary
            vertical
            icon="labeled"
            style={{ float: "left", width: "100%", fontFamily: "Roboto" }}
          >
            <Menu.Item
              style={{ margin: "10% 0% 10% 1%", cursor: "pointer" }}
              onClick={() => {
                history.push({ pathname: "/" });
              }}
            >
              <Image
                style={{ float: "left" }}
                src={require("./../images/wiprologo.png")}
              />
              <div
                style={{
                  borderLeft: "1px solid #dcddde",
                  height: "40px",
                  marginLeft: "10%",
                  float: "left"
                }}
              />
              <h3 style={{ marginTop: "6%" }}>RIG</h3>
            </Menu.Item>
            <Menu.Item
              style={{ textAlign: "left", color: "black", marginTop: "18%" }}
            >
              <span
                style={{
                  fontWeight: "bold"
                }}
              >
                LEADERBOARD
              </span>
            </Menu.Item>
            <Menu.Item
              as="a"
              style={{ textAlign: "left" }}
              active={this.state.activeName === "teamDashBoard"}
              onClick={() => {
                this.setState(
                  {
                    activeName: "teamDashBoard"
                  },
                  () => {
                    history.push({
                      pathname: "/teamDashBoard"
                    });
                  }
                );
              }}
            >
              <span style={{}}>Team</span>
            </Menu.Item>
            <Menu.Item
              as="a"
              active={this.state.activeName === "individualDashBoard"}
              style={{ textAlign: "left" }}
              onClick={() => {
                this.setState(
                  {
                    activeName: "individualDashBoard"
                  },
                  () => {
                    history.push({
                      pathname: "/individualDashBoard"
                    });
                  }
                );
              }}
            >
              <span style={{}}>Individual</span>
            </Menu.Item>
            <Menu.Item
              style={{ textAlign: "left", color: "black", marginTop: "18%" }}
            >
              <span style={{ fontWeight: "bold" }}>RULES</span>
            </Menu.Item>
            <Menu.Item
              as="a"
              active={this.state.activeName === "teamRules"}
              style={{ textAlign: "left" }}
              onClick={() => {
                this.setState(
                  {
                    activeName: "teamRules"
                  },
                  () => {
                    history.push({
                      pathname: "/teamRules"
                    });
                  }
                );
              }}
            >
              <span style={{}}>Team</span>
            </Menu.Item>
            <Menu.Item
              as="a"
              active={this.state.activeName === "individualRules"}
              style={{ textAlign: "left" }}
              onClick={() => {
                this.setState(
                  {
                    activeName: "individualRules"
                  },
                  () => {
                    history.push({
                      pathname: "/individualRules"
                    });
                  }
                );
              }}
            >
              <span style={{}}>Individual</span>
            </Menu.Item>
          </Menu>
        </Sidebar>

        <Sidebar.Pusher
          style={{
            background: "linear-gradient(to top, rgb(243,244,248), white)"
          }}
          className="sidePusher"
        >
          {this.props.content}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
export default SidebarVisible;
