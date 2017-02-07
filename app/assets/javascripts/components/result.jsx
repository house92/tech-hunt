import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Result extends Component {
  render() {
    return (
      <div className="result">
        <Row>
          <Col md={8} className="info">
            <a href={`/jobs/${this.props.job.id}`}><h2>{this.props.job.title}</h2></a>
            <div className="description">{this.props.job.description}</div>
          </Col>
          <Col md={4} className="details">
            <div className="location">{this.props.job.location}</div>
            <div className="salary">{`£${this.props.job.salary}`}</div>
          </Col>
        </Row>
      </div>
    );
  }
}
