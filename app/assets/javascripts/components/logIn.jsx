import React, { Component } from 'react';
import { Well, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import _ from 'lodash';
import Header from './header.jsx';
import Functions from '../../../../lib/functions.js';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSignInClick = this._handleSignInClick.bind(this);
    this.rememberMe = this.rememberMe.bind(this);
  }

  _handleInputChange(ev) {
    // Get a deep clone of the component's state before the input change.
    var nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[ev.target.name] = ev.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  _handleSignInClick(e) {
    $.post("/users/sign_in.json", {
      user: {
        email: this.state.email,
        password: this.state.password
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    }, function(data){
      window.location = '/users/dashboard';
    }.bind(this));
  }

  rememberMe() {
    if (this.props.rememberMe) {
      return (
        <div className="field">
          <input name="user[remember_me]" type="hidden" value="0"></input>
          <input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me"></input>
          <label htmlFor="user_remember_me">{`Remember me`}</label>
        </div>
      );
    }
  }

  render() {
    return (
      <Header currentUser={this.props.currentUser}>
        <Row className="top-row-margin">
          <Col xs={12} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <Well bsSize="large">
              <form>
                <div className="field">
                  <ControlLabel htmlFor="user_email">{`E-mail:`}</ControlLabel>
                  <FormControl type="email" name="email"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this._handleInputChange} autoFocus={true} />
                </div>
                <div className="field">
                  <ControlLabel htmlFor="user_password" name="user[password]">{`Password:`}</ControlLabel>
                  <FormControl type="password" name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this._handleInputChange} autoComplete="off" />
                </div>

                {this.rememberMe()}

                  <Col xs={12} md={6} mdOffset={3}>
                    <div className="actions">
                      <Button type="submit" className="btn btn-primary" onClick={this._handleSignInClick}>{`Log In`}</Button>
                    </div>
                    <span>{this.props.deviseLinks}</span>
                  </Col>
              </form>

              <Row>
                <Col xs={12}>
                  <div className="oAuth">
                    <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.props.clientId}`}>{`Log on via Github`}</a>
                  </div>
                </Col>
              </Row>
            </Well>
          </Col>
        </Row>
      </Header>
    );
  }
}
