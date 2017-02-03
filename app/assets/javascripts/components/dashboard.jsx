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
      },
      id: 0
    }

    const myersBriggs = {
      name: "Myers-Briggs",
      data: {
        first: {
          name: "E",
          value: -24
        },
        second: {
          name: "N",
          value: -67
        },
        third: {
          name: "T",
          value: 5
        },
        fourth: {
          name: "J",
          value: 31
        }
      },
      id: 1
    }

    const hunter1 = {
      first_name: "Wanda",
      last_name: "Maximoff",
      bigFive: bigFive,
      myersBriggs: myersBriggs,
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
              <Col md={6}>
                <PsychologicalChart user={user} test={user.hunter.bigFive} data={user.hunter.bigFive.data} />
              </Col>
              <Col md={6}>
                <PsychologicalChart user={user} test={user.hunter.myersBriggs} data={user.hunter.myersBriggs.data} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    );
  }
}
