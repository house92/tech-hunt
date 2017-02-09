import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from './header.jsx';
import AccountInfo from './accountInfo.jsx';
import PsychologicalChart from './psychologicalChart.jsx';

export default class UserProfile extends Component {
  render() {
    var personalityCharts;
    var bigFive;
    var myersBriggs;
    if (this.props.currentUser && this.props.currentUser.account_type == "employer") {
      if (this.props.bigFive) {
        bigFive = <Col md={6}>
          <PsychologicalChart user={this.props.user} test={this.props.bigFive} data={this.props.bigFive} />
        </Col>
      }
      if (this.props.myersBriggs) {
        myersBriggs = <Col md={6}>
          <PsychologicalChart user={this.props.user} test={this.props.myersBriggs} data={this.props.myersBriggs} />
        </Col>
      }
      if (this.props.bigFive || this.props.myersBriggs) {
        personalityCharts = (
          <div className="personality-charts">
            <Row>
              <Col xs={12}>
                <h2>{`Personality profile`}</h2>
              </Col>
            </Row>
            <Row>
              {bigFive}
              {myersBriggs}
            </Row>
          </div>
        );
      }
    }
    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
            <Row>
              <Col xs={12}>
                <AccountInfo account={this.props.account} />
              </Col>
            </Row>
            {personalityCharts}
          </Col>
        </Row>
      </Header>
    );
  }
}
