import React from "react";
import DEMO from "../../store/constant";
import moment from "moment";
import TaskModal from "./TaskModal";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import { Alert } from "react-bootstrap";

export default class SingleTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      deleted: false,
      status: DEMO.PRIVATE,
    };
  }
  deleteTask = () => {
    axiosInstance
      .delete(Endpoints.tasks + "/" + this.props.taskId)
      .then((res) => {
        this.props.onDelete(this.props.taskId);
      });
  };
  makePublic = (status) => {
    axiosInstance
      .put(Endpoints.tasks + "/" + this.props.taskId, {
        status: status,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          status: status,
        });
      })
      .catch((e) => console.log(e));
  };
  openModal = () => {
    if (!this.props.shared) {
      this.setState({
        ...this.state,
        show: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      show: false,
    });
  };

  render() {
    return (
      <>
        <tr className="unread">
          {this.state.deleted === true && (
            <Alert key={"id"} variant={"success"}>
              Successfuly Deleted
            </Alert>
          )}
          <td></td>
          <td onClick={() => this.openModal()}>
            <h6 className="mb-1">{this.props.title}</h6>
            <p className="m-0">{this.props.description}</p>
          </td>
          <td>
            <h6 className="text-muted">
              <i className="fa fa-circle text-c-green f-10 m-r-15" />
              {this.props.endedat && (
                <>
                  {moment(this.props.endedat)
                    .endOf(this.props.endedat)
                    .fromNow()}
                </>
              )}
            </h6>
          </td>
          <td>
            {!this.props.shared && this.props.userId == DEMO.CURRENT_USER && (
              <>
                <a
                  onClick={() => this.deleteTask()}
                  href={DEMO.BLANK_LINK}
                  className="label theme-bg2 text-white f-12"
                >
                  Delete
                </a>

                {this.state.status === DEMO.PRIVATE && (
                  <a
                    onClick={(e) => this.makePublic(DEMO.PUBLIC)}
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg text-white f-12"
                  >
                    Share
                  </a>
                )}
                <a
                  href={"/task/" + this.props.taskId}
                  className="label theme-bg3 text-blue f-12"
                >
                  Link
                </a>
              </>
            )}
          </td>
        </tr>
        {this.state.show && (
          <TaskModal
            taskId={this.props.taskId}
            show={this.state.show}
            closeModal={this.handleClose}
          />
        )}
      </>
    );
  }
}
