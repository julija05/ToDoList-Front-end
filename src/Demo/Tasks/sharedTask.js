import React from "react";
import { Card, Col, Table } from "react-bootstrap";
import { axiosInstance } from "../../network/axiosService";
import { Endpoints } from "../../network/endpoints";
import SingleTask from "./singleTask";

export default class SingleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: undefined,
    };
  }

  componentDidMount() {
    axiosInstance
      .get(Endpoints.tasks + "/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          task: res.data,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <>
        <Card className="Recent-Users">
          <Card.Body className="px-0 py-2">
            <Table responsive hover>
              <tbody>
                {this.state.task ? (
                  <SingleTask
                    title={this.state.task.name}
                    description={this.state.task.description}
                    endedat={this.state.task.ended_at}
                    taskId={this.state.task.id}
                    shared={true}
                  />
                ) : (
                  <p>Task is private or does not exist</p>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Col>
          <a href={"/lists"} className="label theme-bg2 text-white f-12">
            Back
          </a>
        </Col>
      </>
    );
  }
}
