import React, { Component } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import DEMO from "../../store/constant";
import { Alert } from "react-bootstrap";

export default class ListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: "",
      listStatus: "",
      listDescription: "",
      showListModal: props.show,
      err: false,
      errMessage: "",
    };
  }

  handleListClose = () => {
    this.props.closeModal();
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

  createList = () => {
    axiosInstance
      .post(Endpoints.lists, {
        name: this.state.listName,
        description: this.state.listDescription,
        status: this.state.listStatus,
      })
      .then((res) => {
        if (res && res.meta.status === DEMO.STATUS_OK) {
          this.setState({
            ...this.state,
            showListModal: this.handleListClose(),
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
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleListClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <FormGroup>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Task name"
                className="mb-3"
                onChange={(e) => this.onChangeListName(e)}
              >
                <input
                  placeholder="Leave a task name here"
                  value={this.state.listName}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Description"
                onChange={(e) => this.onChangeListDescription(e)}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a description here"
                  style={{ height: "100px" }}
                  value={this.state.listDescription}
                />
              </FloatingLabel>

              <br />
              <div>
                <select
                  aria-label="Select Status"
                  onChange={(e) => this.onChangeListStatus(e)}
                  value={this.state.listStatus}
                >
                  <option value={DEMO.PRIVATE}>Private</option>
                  <option value={DEMO.PUBLIC}>Public</option>
                </select>
              </div>
            </FormGroup>
            {this.state.errMessage.length > 0 && (
              <Alert key={"dad"} variant={"danger"}>
                {this.state.errMessage}
              </Alert>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleListClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => this.createList()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
