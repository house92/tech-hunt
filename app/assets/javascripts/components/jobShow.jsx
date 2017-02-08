import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Header from './header.jsx';

export default class JobShow extends Component {
  render() {
    var applyButton;
    if (this.props.currentUser && this.props.currentUser.account_type == "hunter") {
      applyButton = (
        <Row>
          <Col xs={12} md={4} mdOffset={4}>
            <a href={`/jobs/${this.props.job.id}/applications/new`}><Button type="button" className="btn btn-primary">{`Apply`}</Button></a>
          </Col>
        </Row>
      );
    }

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <div className="job">
              <Row>
                <Col xs={12}>
                  <h1 className="title">{this.props.job.title}</h1>
                  <a href={`/employers/${this.props.job.employer_id}`}>{`Go to employer's page`}</a>
                </Col>
              </Row>
              <Row className="details">
                <Col xs={12} md={5} mdOffset={1}>
                  <div>{`Location: ${this.props.job.location}`}</div>
                  <div>{`Salary: ${this.props.job.salary}`}</div>
                  <div>{`Grading: ${this.props.job.grading}`}</div>
                </Col>
                <Col xs={12} md={5}>
                  <div>{this.props.job.full_time ? "Full-time" : "Part-time"}</div>
                  <div>{this.props.job.contract ? "Contract" : "Permanent"}</div>
                  <div>{this.props.job.offers_visa ? "Offers visa sponsorship" : ""}</div>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="description">
                    {this.props.job.description}
                  </div>
                </Col>
              </Row>
              {applyButton}
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}
