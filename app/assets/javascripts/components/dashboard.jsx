import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './header.jsx';
import ApplicationsContainer from './applicationsContainer.jsx';
import PsychologicalChart from './psychologicalChart.jsx';

export default class Dashboard extends Component {
  render() {
    const bigFive = {
      name: "Big Five",
      data: {
        openness: 0.8,
        conscientiousness: 0.775,
        extraversion: 0.675,
        agreeableness: 0.625,
        stability: 0.625
      }
    }

    const hunter1 = {
      first_name: "Wanda",
      last_name: "Maximoff",
      bigFive: bigFive,
      id: 0
    }

    const user = {
      account_type: "hunter",
      hunter: hunter1,
      id: 0
    }

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col md={3}>

          </Col>
          <Col md={9}>
            <h1>Dashboard</h1>
            <Row>
              <Col md={6}>
                <ApplicationsContainer currentUser={this.props.currentUser} applications={this.props.applications} />
              </Col>
              <Col md={6}>

              </Col>
            </Row>
            <Row>
              <PsychologicalChart user={user} test={user.hunter.bigFive.name} data={user.hunter.bigFive.data} />
            </Row>
          </Col>
        </Row>
      </Header>
    );
  }
}
