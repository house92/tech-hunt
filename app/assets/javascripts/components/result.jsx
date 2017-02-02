import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Result extends Component {
  render() {
    return (
      <div className="result">
        <Row>
          <Col md={6}>
            <h2>{this.props.job.title}</h2>
            <div className="description">{this.props.job.description}</div>
          </Col>
          <Col md={4}>
            <div className="location">{this.props.job.location}</div>
            <div className="salary">{this.props.job.salary}</div>
          </Col>
        </Row>
      </div>
    );
  }
}
