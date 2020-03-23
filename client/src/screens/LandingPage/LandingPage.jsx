import React, { Component } from "react";
import SidebarVisible from "../../components/SideBar";

export default class Home extends Component {
  render() {
    return (
      <div>
        <SidebarVisible
          content={this.props.children}
          activeName={this.props.activeName}
        />
      </div>
    );
  }
}
