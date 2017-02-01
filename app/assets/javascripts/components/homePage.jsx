import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Image } from 'react-bootstrap';
import Header from './header.jsx';
import Search from './search.jsx';

const beach = "/assets/_qnpkc4c6e4-anders-wideskott.jpg";
const desk = "/assets/lrssalok1fu-rawpixel-com.jpg";
const cityscape = "/assets/rxnxdbgsj0m-josh-swift.jpg";
const nighttime_city = "/assets/w4dzcoygt4e-anders-jilden.jpg";

const chance = Math.random();

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { background: chance > 0.5 ? chance > 0.75 ? beach : desk : chance < 0.25 ? cityscape : nighttime_city };
  }
  render() {
    return (
      <Grid fluid>
        <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
          <Jumbotron>
            <Image src={this.state.background} />
            <div className="content">
              <Row className="text-center">
                <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
                  <h1>{`TechHunt`}</h1>
                </Col>
                <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
                  <h2>{`Where will your job take you?`}</h2>
                </Col>
              </Row>

              <Row>
                <Col  xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
                  <Search />
                </Col>
              </Row>
            </div>


          </Jumbotron>
        </Header>
      </Grid>

    );
  }
}
