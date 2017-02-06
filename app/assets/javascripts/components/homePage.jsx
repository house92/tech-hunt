import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Image } from 'react-bootstrap';
import Header from './header.jsx';
import Search from './search.jsx';

const beach = {landscape: "/assets/beach.jpg", portrait: "/assets/beach-portrait.jpg"};
const map = {landscape: "/assets/map.jpg", portrait: "/assets/map-portrait.jpg"};
const skyline = {landscape: "/assets/skyline.jpg", portrait: "/assets/skyline-portrait.jpg"};
const skyscrapers = {landscape: "/assets/skyscrapers.jpg", portrait: "/assets/skyscrapers-portrait.jpg"};

const chance = Math.random();
const background = chance > 0.5 ? chance > 0.75 ? beach : map : chance < 0.25 ? skyline : skyscrapers;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { background: window.innerWidth < window.innerHeight && window.innerWidth < 500 ? background.portrait : background.landscape };
  }

  componentDidMount() {
    var screenWidth;
    setTimeout(() => {
      screenWidth = window.innerWidth;
    }, 10);
    window.addEventListener('resize', () => {
      if (window.innerWidth != screenWidth) {
        if (window.innerWidth < window.innerHeight && window.innerWidth < 500) {
          this.setState({ background: background.portrait });
        } else {
          this.setState({ background: background.landscape });
        }
      }
    });
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
