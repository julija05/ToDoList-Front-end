import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DEMO from "../../store/constant";
import { Alert } from "react-bootstrap";

export default class TaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      taskDate: moment(Date.now()).format(DEMO.DATE_FORMAT),
      taskName: props.taskName,
      taskDescription: props.taskDescription,
      taskStatus: props.taskStatus,
      selectedListId: props.selectedListId,
      taskId: props.taskId,
      lists: [],
      err: false,
      errMessage: "",
    };
  }

  componentDidMount() {
    if (this.props.taskId > 0) {
      axiosInstance
        .get(Endpoints.tasks + "/" + this.props.taskId.toString())
        .then((res) => {
          if (res && res.meta.status === DEMO.STATUS_OK) {
            this.setState({
              ...this.state,
              taskName: res.data.name,
              taskDescription: res.data.description,
              selectedListId: res.data.to_do_list_id,
              taskDate: res.data.ended_at,
              taskStatus: res.data.status,
              taskId: res.data.id,
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
    }
    axiosInstance
      .get(Endpoints.lists)
      .then((res) => {
        if (res && res.meta.status === 200) {
          this.setState({
            ...this.state,
            lists: res.data,
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
  }
  handleClose = () => {
    this.props.closeModal();
  };

  onChangeSelectBox = (e) => {
    console.log("e", e);
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

  createTask = () => {
    if (this.state.taskId > 0) {
      axiosInstance
        .put(Endpoints.tasks + "/" + this.state.taskId.toString(), {
          id: this.state.taskId,
          name: this.state.taskName,
          description: this.state.taskDescription,
          to_do_list_id: this.state.selectedListId,
          status: this.state.taskStatus,
          //Y-m-d H:i:s
          ended_at: this.state.taskDate,
        })
        .then((res) => {
          if (res && res.meta.status === DEMO.STATUS_OK) {
            this.handleClose();
          }
          this.setState({
            ...this.state,
            err: true,
            errMessage: "Invalid Input",
          });
        })
        .catch((e) => console.log(e));
      return;
    }

    axiosInstance
      .post(Endpoints.tasks, {
        name: this.state.taskName,
        description: this.state.taskDescription,
        to_do_list_id: this.state.selectedListId,
        status: this.state.taskStatus,
        ended_at: this.state.taskDate,
      })
      .then((res) => {
        if (res && res.meta.status === DEMO.STATUS_OK) {
          this.handleClose();
        }
        this.setState({
          ...this.state,
          err: true,
          errMessage: "Invalid Input",
        });
      })
      .catch((e) => console.log(e));
  };

  onChangeDate = (d) => {
    this.setState({
      ...this.state,
      taskDate: moment(d).format(DEMO.DATE_FORMAT),
    });
  };

  render() {
    return (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create/Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <FormGroup>
              <input
                label="Task name"
                className="mb-3"
                onChange={(e) => this.onChangeTaskName(e)}
                value={this.state.taskName}
              />
              <div>
                <input
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: "100px" }}
                  value={this.state.taskDescription}
                  onChange={(e) => this.onChangeTaskDescription(e)}
                />
              </div>
              <br />
              <div>
                <select
                  value={this.state.selectedListId}
                  aria-label="Select List"
                  onChange={(e) => this.onChangeSelectBox(e)}
                >
                  {this.state.lists && this.state.lists.length > 0 && (
                    <>
                      {this.state.lists.map((item) => {
                        return (
                          <option
                            value={item.id}
                            key={item.id}
                            title={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </>
                  )}
                </select>
              </div>
              <br />
              <div>
                <select
                  aria-label="Select Status"
                  onChange={(e) => this.onChangeStatus(e)}
                  value={this.state.taskStatus}
                >
                  <option value={DEMO.PRIVATE}>Private</option>
                  <option value={DEMO.PUBLIC}>Public</option>
                </select>
              </div>
              <br />

              <DatePicker
                selected={moment(this.state.taskDate).toDate()}
                onChange={(e) => this.onChangeDate(e)}
                inline
                timeFormat={DEMO.DATE_PIKER_TIME_FORMAT}
                timeIntervals={DEMO.TIME_INTERVAL}
                showTimeSelect
                timeCaption="time"
                dateFormat={DEMO.DATE_PIKER_DATE_FORMAT}
              />
            </FormGroup>
            {this.state.errMessage.length > 0 && (
              <Alert key={"00"} variant={"danger"}>
                {this.state.errMessage}
              </Alert>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => this.handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.createTask()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
