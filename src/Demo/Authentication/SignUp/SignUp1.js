import React from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import { axiosInstance } from "../../../network/axiosService";
import { Endpoints } from "../../../network/endpoints";
import { Redirect } from "react-router";
import { Alert } from "react-bootstrap";

class SignUp1 extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      signUp: "",
      errMessage: "",
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value,
    });
  };

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

  onChangePasswordConfirm = (e) => {
    this.setState({
      ...this.state,
      passwordConfirm: e.target.value,
    });
  };

  submit = () => {
    axiosInstance
      .post(Endpoints.users, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirm,
      })
      .then((res) => {
        if (res && res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            signUp: true,
          });
        } else {
          this.setState({
            ...this.state,
            signUp: false,
            errMessage: "Invalid Input!  ",
          });
        }
      })
      .catch((e) => console.log(e));
  };

  render() {
    if (this.state.signUp === true) {
      return <Redirect to="/auth/signin-1" />;
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
                  <i className="feather icon-user-plus auth-icon" />
                </div>
                <h3 className="mb-4">Sign up</h3>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.onChangeUsername(e)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => this.onChangeEmail(e)}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.onChangePassword(e)}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password-Confirmation"
                    value={this.state.passwordConfirm}
                    onChange={(e) => this.onChangePasswordConfirm(e)}
                    required
                  />
                </div>
                <div className="form-group text-left">
                  {this.state.errMessage.length > 0 && (
                    <Alert key={"dad"} variant={"danger"}>
                      {this.state.errMessage}
                    </Alert>
                  )}
                </div>
                <button
                  onClick={(e) => this.submit(e)}
                  className="btn btn-primary shadow-2 mb-4"
                >
                  Sign up
                </button>
                <p className="mb-0 text-muted">
                  Allready have an account?{" "}
                  <NavLink to="/auth/signin-1">Login</NavLink>
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
