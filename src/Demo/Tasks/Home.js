import React from "react";
import { Row, Col, Card, Button, Pagination } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import SingleList from "./singleList";
import ListModal from "./ListModal";
import TaskModal from "./TaskModal";
import { Redirect } from "react-router";
import DEMO from "../../store/constant";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedListId: 0,
      taskName: "",
      taskDescription: "",
      taskStatus: "",
      listName: "",
      listDescription: "",
      listStatus: "",
      refreshListKey: 1,
      tasks: [
        {
          name: "",
          description: "",
        },
      ],
      show: false,
      lists: [],
      showListModal: false,
      current_page: DEMO.CURRENT_PAGE,
      last_page: DEMO.LAST_PAGE,
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      show: false,
      refreshListKey: this.getRandomInt(DEMO.RANDOM_INT),
    });
  };

  handleListClose = () => {
    this.setState(
      {
        ...this.state,
        showListModal: false,
      },
      () => {
        this.setPage(DEMO.FIRST_PAGE);
      }
    );
  };

  setPage = (p) => {
    if (p > 0) {
      axiosInstance
        .get(Endpoints.lists + "?page=" + p.toString())
        .then((res) => {
          console.log("adada", res);
          if (res.meta.status === DEMO.STATUS_OK) {
            this.setState({
              ...this.state,
              tasks: res.data,
              current_page: res.meta.pagination.current_page,
              last_page: res.meta.pagination.last_page,
            });
          }
        });
    }
  };

  openModal = () => {
    this.setState({
      ...this.state,
      show: true,
    });
  };

  openListModal = () => {
    this.setState({
      ...this.state,
      showListModal: true,
    });
  };

  checkToken = () => {
    if (!localStorage.getItem("token")) {
      return false;
    }

    return true;
  };

  componentDidMount() {
    axiosInstance
      .get(Endpoints.lists)
      .then((res) => {
        if (res) {
          if (res.meta.status === DEMO.STATUS_OK) {
            this.setState({
              ...this.state,
              tasks: res.data,
              current_page: res.meta.pagination.current_page,
              last_page: res.meta.pagination.last_page,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }

  onChangeSelectBox = (e) => {
    this.setState({
      ...this.state,
      selectedListId: e.target.value,
    });
  };
  onChangeTaskName = (e) => {
    this.setState({
      ...this.state,
      taskName: e.target.value,
    });
  };
  onChangeTaskDescription = (e) => {
    this.setState({
      ...this.state,
      taskDescription: e.target.value,
    });
  };

  onChangeStatus = (e) => {
    this.setState({
      ...this.state,
      taskStatus: e.target.value,
    });
  };

  onChangeListName = (e) => {
    this.setState({
      ...this.state,
      listName: e.target.value,
    });
  };
  onChangeListDescription = (e) => {
    this.setState({
      ...this.state,
      listDescription: e.target.value,
    });
  };

  onChangeListStatus = (e) => {
    this.setState({
      ...this.state,
      listStatus: e.target.value,
    });
  };

  createTask = () => {
    axiosInstance
      .post(Endpoints.tasks, {
        name: this.state.taskName,
        description: this.state.taskDescription,
        to_do_list_id: this.state.selectedListId,
        status: this.state.taskStatus,
      })
      .then((res) => {
        if (res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            show: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  createList = () => {
    axiosInstance
      .post(Endpoints.lists, {
        name: this.state.listName,
        description: this.state.listDescription,
        status: this.state.listStatus,
      })
      .then((res) => {
        if (res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            showListModal: false,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  render() {
    if (!this.checkToken()) {
      return <Redirect to="/auth/signin-1" />;
    }

    return (
      <Aux>
        <div>
          <Button
            onClick={() => this.openListModal()}
            variant="primary"
            size="sm"
          >
            Create List
          </Button>
          {this.state.showListModal && (
            <ListModal
              show={this.state.showListModal}
              closeModal={this.handleListClose}
            />
          )}
          <Button onClick={(e) => this.openModal()} variant="light" size="sm">
            Create Task
          </Button>
          {this.state.show && (
            <TaskModal
              taskId={0}
              show={this.state.show}
              closeModal={this.handleClose}
            />
          )}
        </div>
        <Row>
          <Col md={6} xl={8}>
            {this.state.tasks.length && this.state.tasks.length > 0 && (
              <>
                {this.state.tasks.map((item) => {
                  return (
                    <SingleList
                      key={this.state.refreshListKey + item.id + "_list"}
                      idList={item.id}
                      title={item.name}
                      description={item.description}
                      status={item.status}
                      userId={item.user_id}
                    />
                  );
                })}
              </>
            )}
          </Col>
        </Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={(e) => this.setPage(this.state.current_page - 1)}
            />
            {this.state.current_page - 1 > 0 && (
              <>
                <Pagination.Item
                  onClick={(e) => this.setPage(this.state.current_page - 1)}
                >
                  {this.state.current_page - 1}
                </Pagination.Item>
              </>
            )}
            <Pagination.Item active>{this.state.current_page}</Pagination.Item>
            {this.state.current_page < this.state.last_page && (
              <>
                <Pagination.Item
                  onClick={(e) => this.setPage(this.state.current_page + 1)}
                >
                  {this.state.current_page + 1}
                </Pagination.Item>

                <Pagination.Next
                  onClick={(e) => this.setPage(this.state.current_page + 1)}
                />
              </>
            )}
          </Pagination>
        </Col>
      </Aux>
    );
  }
}

export default Home;
