import React from "react";
import { Row, Col, Card } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import SingleList from "./singleList";
import DEMO from "../../store/constant";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {},
    };
  }

  componentDidMount() {
    axiosInstance
      .get(Endpoints.lists + "/" + this.props.match.params.id)
      .then((res) => {
        if (res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            list: res.data,
          });
        }
      })
      .catch((e) => this.setState({ ErrMsg: "List Not Found" }));
  }

  render() {
    return (
      <Aux>
        <div></div>
        <Row>
          <Col md={6} xl={8}>
            {this.state.list && (
              <SingleList
                idList={this.state.list.id}
                title={this.state.list.name}
                description={this.state.list.description}
                status={this.state.list.status}
              />
            )}

            {this.state.ErrMsg && <p className="my-3">{this.state.ErrMsg}</p>}
            <a href={"/lists"} className="label theme-bg2 text-white f-12">
              Back
            </a>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Home;
