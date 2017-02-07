import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ApplicationShow from './applicationShow.jsx';
import Functions from '../../../../lib/functions.js';

export default class ApplicationsContainer extends Component {
  render() {
    const applications = this.props.applications.map((application, i) => {
      const name = this.props.currentUser.account_type == "hunter" ? `${application.hunter.first_name} ${application.hunter.last_name}` : application.job.employer.company_name;
      return (
        <div key={`application${i + 1}`} className="application">
            <Row>
              <Col md={8} className="info">
                <div className="title">
                  <a href={`/jobs/${application.job.id}/applications/${application.id}`}>{application.job.title}</a>
                </div>
                <div className="name">
                  <a href={`/hunters/${application.hunter_id}`}>{name}</a>
                </div>
              </Col>
              <Col md={4} className="details">
                {Functions.formatDate(Date.parse(application.created_at, false))}
              </Col>
            </Row>

        </div>
      );
    });
    return (
      <div className="applications">
        <h2>{`Applications`}</h2>
        {applications}
      </div>
    );
  }
}
