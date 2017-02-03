import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './header.jsx';
import ApplicationsContainer from './applicationsContainer.jsx';
import PsychologicalChart from './psychologicalChart.jsx';

export default class Dashboard extends Component {
  render() {
    var bigFive;
    var myersBriggs;
    var personalityCharts;

    if (this.props.currentUser.account_type == "hunter") {
      if (this.props.bigFive) {
        bigFive = <Col md={6}>
          <PsychologicalChart user={this.props.currentUser} test={this.props.bigFive} data={this.props.bigFive} />
        </Col>
      }
      if (this.props.myersBriggs) {
        myersBriggs = <Col md={6}>
          <PsychologicalChart user={this.props.currentUser} test={this.props.myersBriggs} data={this.props.myersBriggs} />
        </Col>
      }
      personalityCharts = (
        <Row>
          <Row>
            <Col xs={12}>
              <h2>{`Personality profile`}</h2>
              <a href={`/users/${this.props.currentUser.id}/tests`}>{`Take tests`}</a>
            </Col>
          </Row>
          <Row>
            {bigFive}
            {myersBriggs}
          </Row>
        </Row>
      );
    }

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col md={3}>

          </Col>
          <Col md={9}>
            <h1>{`Dashboard`}</h1>
            <Row>
              <Col md={6}>
                <ApplicationsContainer currentUser={this.props.currentUser} applications={this.props.applications} />
              </Col>
              <Col md={6}>

              </Col>
            </Row>
            {personalityCharts}
          </Col>
        </Row>
      </Header>
    );
  }
}
