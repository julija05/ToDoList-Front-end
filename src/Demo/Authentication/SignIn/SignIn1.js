import React from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { axiosInstance } from "../../../network/axiosService";
import { Endpoints } from "../../../network/endpoints";
import { Redirect } from "react-router";
import { Alert } from "react-bootstrap";
import DEMO from "../../../store/constant";

class SignUp1 extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loggedIn: "",
      errCode: "",
      errMessage: "",
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      ...this.state,
      email: e.target.value,
    });
  };
  onChangePassword = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value,
    });
  };

  submit = () => {
    axiosInstance
      .post(Endpoints.login, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.meta && res.meta.status === DEMO.STATUS_OK) {
          localStorage.setItem("token", res.meta.token);
          localStorage.setItem("currentUser", res.data.username);
          localStorage.setItem("current_id", res.data.id);
          this.setState({
            ...this.state,
            loggedIn: true,
            errMessage: "",
          });
        } else if (!res.status) {
          this.setState({
            ...this.state,
            loggedIn: false,
            errMessage: "Check your email and password",
          });
        }
      })
      .catch((e) => console.log(e));
  };

  render() {
    if (this.state.loggedIn === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => this.onChangeEmail(e)}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={this.state.password}
                    onChange={(e) => this.onChangePassword(e)}
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    {this.state.errMessage.length > 0 && (
                      <Alert key={"dad"} variant={"danger"}>
                        {this.state.errMessage}
                      </Alert>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => this.submit(e)}
                  className="btn btn-primary shadow-2 mb-4"
                >
                  Login
                </button>

                <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <NavLink to="/auth/signup-1">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
