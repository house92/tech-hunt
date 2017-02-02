import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ApplicationShow from './applicationShow.jsx';

export default class ApplicationsContainer extends Component {
  render() {
    const applications = this.props.applications.map((application, i) => {
      const name = this.props.currentUser.account_type == "hunter" ? `${application.hunter.first_name} ${application.hunter.last_name}` : application.job.employer.company_name;
      return (
        <div key={`application${i + 1}`} className="application">
          <a href={`/jobs/${application.job.id}/applications/${application.id}`}>
            <Row>
              <Col md={10}>
                <div className="title">{application.job.title}</div>
                <div className="name">{name}</div>
              </Col>
              <Col md={2}>
                {application.created_at.toString()}
              </Col>
            </Row>
          </a>
        </div>
      );
    });
    return (
      <div className="applications">
        <h2>Applications</h2>
        {applications}
      </div>
    );
  }
}
