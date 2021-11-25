import React from "react";
import { Button, Card, Col, Collapse, Row, Table } from "react-bootstrap";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import SingleTask from "./singleTask";
import { Link } from "react-router-dom";
import DEMO from "../../store/constant";

export default class SingleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      show: false,
      collapse: false,
      status: props.status,
      err: false,
      errMessage: "",
    };
  }

  taskFeched = false;

  openModal = () => {
    this.setState({
      ...this.state,
      show: true,
    });
  };

  shareList = (status) => {
    axiosInstance
      .put(Endpoints.lists + "/" + this.props.idList.toString(), {
        status: status,
      })
      .then((res) => {
        if (res && res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            status: status,
            showSharedModalInfo: status === 1,
          });
        } else {
          this.setState({
            ...this.state,
            err: true,
            errMessage: "Invalid Input",
          });
        }
      })
      .catch((e) => console.log(e));
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      show: false,
    });
  };
  onDelete = (id) => {
    let tasks = this.state.tasks.map((item) => {
      if (item.id != id) {
        return item;
      }
    });
    this.setState({
      ...this.state,
      tasks: tasks,
    });
  };

  handleSharedModalClose = () => {};

  showCollapse = () => {
    if (this.state.collapse === false) {
      if (!this.taskFeched) {
        axiosInstance
          .get(Endpoints.lists + "/" + this.props.idList)
          .then((res) => {
            if (res && res.meta.status === DEMO.STATUS_OK) {
              this.taskFeched = true;
              this.setState({
                ...this.state,
                tasks: res.data.tasks,
                collapse: true,
              });
            }
          })
          .catch((e) => console.log(e));
        return;
      }

      this.setState({
        ...this.setState,
        collapse: true,
      });
    } else {
      this.setState({
        ...this.setState,
        collapse: false,
      });
    }
  };
  render() {
    return (
      <>
        <Card className="Recent-Users">
          <Card.Header>
            <Row>
              <Col onClick={(e) => this.showCollapse()} sm={9}>
                <Card.Title as="h5">{this.props.title}</Card.Title>
                <div>{this.props.description}</div>
              </Col>

              <Col sm={3}>
                {this.state.status === DEMO.PRIVATE &&
                  this.props.userId == DEMO.CURRENT_USER && (
                    <Button
                      onClick={(e) => this.shareList(DEMO.PUBLIC)}
                      variant="secondary"
                      size="sm"
                    >
                      Make Public
                    </Button>
                  )}
                {this.state.status === DEMO.PUBLIC &&
                  this.props.userId == DEMO.CURRENT_USER && (
                    <Button
                      onClick={(e) => this.shareList(DEMO.PRIVATE)}
                      variant="secondary"
                      size="sm"
                    >
                      Make Private
                    </Button>
                  )}

                <p>
                  <Link to={"/list/" + this.props.idList}>Link</Link>
                </p>
              </Col>
            </Row>
          </Card.Header>
          <Collapse in={this.state.collapse}>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  {this.state.tasks && this.state.tasks.length > 0 && (
                    <>
                      {this.state.tasks.map((item) => {
                        if (item) {
                          return (
                            <SingleTask
                              title={item.name}
                              description={item.description}
                              endedat={item.ended_at}
                              taskId={item.id}
                              key={item.id + "_task"}
                              onDelete={this.onDelete}
                              status={item.status}
                              userId={item.user_id}
                            />
                          );
                        }
                      })}
                    </>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Collapse>
        </Card>
      </>
    );
  }
}
