import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './header.jsx';
import Result from './result.jsx';

export default class ResultsContainer extends Component {
  render() {
    const results = this.props.jobs.map((job, i) => {
      return <Result key={`results${i + 1}`} job={job} />;
    });
    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col md={3}>

          </Col>
          <Col md={9}>
            <div>{`Your search returned ${this.props.jobs.length} result${this.props.jobs.length == 1 ? "" : "s"}.`}</div>
            <div className="results">
              {results}
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}
