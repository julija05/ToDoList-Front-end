import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";

import { axiosInstance } from "../../../../../network/axiosService";
import { Endpoints } from "../../../../../network/endpoints";
import { Redirect } from "react-router";

class NavRight extends Component {
  state = {
    listOpen: false,
    logOut: false,
  };

  logOut = () => {
    axiosInstance
      .post(Endpoints.logout)
      .then((res) => {
        if (res.meta.status === DEMO.STATUS_OK) {
          localStorage.setItem("token", "");
          localStorage.setItem("currentUser", "");
          localStorage.setItem("current_id", "");
          this.setState({
            ...this.state,
            logOut: true,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  render() {
    if (this.state.logOut === true) {
      return <Redirect to="/auth/signin-1" />;
    }
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src={Avatar1}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>{localStorage.getItem("currentUser")}</span>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="dud-logout"
                    title="Logout"
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-settings" /> Settings
                    </a>
                  </li>
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-user" /> Profile
                    </a>
                  </li>

                  <li>
                    <a onClick={() => this.logOut()} className="dropdown-item">
                      <i className="feather icon-lock" /> Log Out
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
    );
  }
}

export default NavRight;
