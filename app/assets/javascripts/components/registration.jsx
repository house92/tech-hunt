import React, { Component } from 'react';
import { Well, Row, Col, FormGroup, FormControl, ControlLabel, Button, Radio } from 'react-bootstrap';
import _ from 'lodash';
import Header from './header.jsx';
import Functions from '../../../../lib/functions.js';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviseErrorMessages: this.props.deviseErrorMessages,
      email: '',
      password: '',
      password_confirmation: '',
      account_type: 'hunter',
      first_name: '',
      last_name: '',
      company_name: ''
    };
    // this.passwordLengthCheck = this.passwordLengthCheck.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleRegistrationClick = this._handleRegistrationClick.bind(this);
    this.setAccountType = this.setAccountType.bind(this);
  }

  _handleInputChange(e) {
    // Get a deep clone of the component's state before the input change.
    var nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[e.target.name] = e.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  _handleRegistrationClick(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    $.post('/users.json', {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        account_type: this.state.account_type
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    }, (user) => {
      if (this.state.account_type == "hunter") {
        $.post("/hunters",
          {
            hunter: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              user_id: user.id
            },
            user: user,
            authenticity_token: Functions.getMetaContent("csrf-token")
          },
          (hunter) => {
            window.location = '/';
          }
        ).fail((err) => {
          $.ajax({
            url: `users/${user.id}`,
            method: 'DELETE',
            authenticity_token: Functions.getMetaContent("csrf-token")
          });
          this.setState({ deviseErrorMessages: Functions.convertErrors(err) });
        });
      } else {
        $.post("/employers",
          {
            employer: {
              company_name: this.state.company_name,
              user_id: user.id
            },
            user: user,
            authenticity_token: Functions.getMetaContent("csrf-token")
          },
          (employer) => {
            window.location = '/';
          }
        ).fail((err) => {
          $.ajax({
            url: `users/${user.id}`,
            method: 'DELETE',
            authenticity_token: Functions.getMetaContent("csrf-token")
          });
          this.setState({ deviseErrorMessages: Functions.convertErrors(err) });
        });
      }
    }).fail((err) => {
      this.setState({ deviseErrorMessages: Functions.convertErrors(err) });
    });

  }

  // passwordLengthCheck(e) {
  //   if (e.target.value.length < this.props.minimalPasswordLength) {
  //     return <em>(this.props.minimalPasswordLength characters minimum)</em>;
  //   }
  // }

  setAccountType(e) {
    this.setState({ account_type: e.target.value });
  }

  render() {
    var accountFields;
    var hunterOAuth;
    if (this.state.account_type == "hunter") {
      accountFields = (
        <div className="account-fields">
          <div className="field">
            <ControlLabel htmlFor="user_first_name">{`First name:`}</ControlLabel>
            <FormControl type="text" name="first_name" placeholder="First name" value={this.state.first_name} onChange={this._handleInputChange} />
          </div>
          <div className="field">
            <ControlLabel htmlFor="user_last_name">{`Last name:`}</ControlLabel>
            <FormControl type="text" name="last_name" placeholder="Last name" value={this.state.last_name} onChange={this._handleInputChange} />
          </div>
        </div>
      );
      hunterOAuth = (
        <Row>
          <Col xs={12}>
            <div className="oAuth">
              <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.props.clientId}`}>{`Sign in via Github`}</a>
            </div>
          </Col>
        </Row>
      );
    } else if (this.state.account_type == "employer") {
      accountFields = (
        <div className="account-fields">
          <div className="field">
            <ControlLabel htmlFor="user_company_name">{`Company name:`}</ControlLabel>
            <FormControl type="text" name="company_name" placeholder="Company name" value={this.state.company_name} onChange={this._handleInputChange} />
          </div>
        </div>
      );
      hunterOAuth= (
        <div style={{ padding: '2rem' }}></div>
      );
    }

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        {this.state.deviseErrorMessages}
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

                <div className="field">
                  <ControlLabel htmlFor="user_password_confirmation" name="user[password_confirmation]">{`Confirm password:`}</ControlLabel>
                  <FormControl type="password" name="password_confirmation"
                  placeholder="Re-type password"
                  value={this.state.password_confirmation}
                  onChange={this._handleInputChange} autoComplete="off" />
                </div>

                <div className="field">
                  <ControlLabel>{`Select account type:`}</ControlLabel>
                  <Radio name="account_type" defaultChecked inline value="hunter" onChange={this.setAccountType}>{`Hunter`}</Radio>
                  <Radio name="account_type" inline value="employer" onChange={this.setAccountType}>{`Employer`}</Radio>
                </div>

                {accountFields}

                <Col xs={12} md={6} mdOffset={3}>
                  <div className="actions">
                    <Button type="submit" className="btn btn-primary" onClick={this._handleRegistrationClick}>{`Sign Up`}</Button>
                  </div>
                  <span>{this.props.deviseLinks}</span>
                </Col>
              </form>

              {hunterOAuth}
            </Well>
          </Col>
        </Row>
      </Header>
    );
  }
}
