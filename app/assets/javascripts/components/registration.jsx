import React, { Component } from 'react';
import { Well, Row, Col, FormGroup, FormControl, ControlLabel, Button, Radio } from 'react-bootstrap';
import _ from 'lodash';
import Header from './header.jsx';
import Functions from '../../../../lib/functions.js';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      accountType: 'hunter',
      firstName: '',
      lastName: '',
      companyName: ''
    };
    this.passwordLengthCheck = this.passwordLengthCheck.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleRegistrationClick = this._handleRegistrationClick.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
  }

  _handleInputChange(ev) {
    // Get a deep clone of the component's state before the input change.
    var nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[ev.target.name] = ev.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  _handleRegistrationClick(e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/users.json",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation
        },
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      window.location = '/';
    }.bind(this));
  }

  passwordLengthCheck(e) {
    if (e.target.value.length < this.props.minimalPasswordLength) {
      return <em>(this.props.minimalPasswordLength characters minimum)</em>;
    }
  }

  setAccountType(e) {
    this.setState({ accountType: e.target.value });
  }

  render() {
    var deviseErrorMessages = this.props.deviseErrorMessages;

    var accountFields;
    if (this.state.accountType == "hunter") {
      accountFields = (
        <div className="account-fields">
          <div className="field">
            <ControlLabel htmlFor="user_first_name">{`First name:`}</ControlLabel>
            <FormControl type="text" name="first_name" placeholder="First name" value={this.state.firstName} onChange={this._handleInputChange} />
          </div>
          <div className="field">
            <ControlLabel htmlFor="user_last_name">{`Last name:`}</ControlLabel>
            <FormControl type="text" name="last_name" placeholder="Last name" value={this.state.lastName} onChange={this._handleInputChange} />
          </div>
        </div>
      );
    } else if (this.state.accountType == "employer") {
      accountFields = (
        <div className="account-fields">
          <div className="field">
            <ControlLabel htmlFor="user_company_name">{`Company name:`}</ControlLabel>
            <FormControl type="text" name="company_name" placeholder="Company name" value={this.state.companyName} onChange={this._handleInputChange} />
          </div>
        </div>
      );
    }

    return (
      <Header currentUser={this.props.currentUser}>
        <Row className="top-row-margin">
          <Col xs={12} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <Well bsSize="large">
              <span dangerouslySetInnerHTML={{__html: deviseErrorMessages}}></span>
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

                <div className="field">
                  <ControlLabel htmlFor="user_password_confirmation" name="user[password_confirmation]">{`Confirm password:`}</ControlLabel>
                  <FormControl type="password" name="password_confirmation"
                  placeholder="Re-type password"
                  value={this.state.passwordConfirmation}
                  onChange={this._handleInputChange} autoComplete="off" />
                </div>

                <div className="field">
                  <ControlLabel>{`Select account type:`}</ControlLabel>
                  <Radio name="account_type" defaultChecked inline value="hunter" onClick={this.setAccountType}>{`Hunter`}</Radio>
                  <Radio name="account_type" inline value="employer" onClick={this.setAccountType}>{`Employer`}</Radio>
                </div>

                {accountFields}

                <Col xs={12} md={6} mdOffset={3}>
                  <div className="actions">
                    <Button type="submit" className="btn btn-primary" onClick={this._handleRegistrationClick}>{`Sign Up`}</Button>
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
