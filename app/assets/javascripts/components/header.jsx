import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Alert } from 'react-bootstrap';
import Functions from '../../../../lib/functions.js';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { userAccount: null }
    this.handleClick = this.handleClick.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillMount() {
    // const component = this;
    // Functions.getAccount(component.props.currentUser, (account) => {
    //   component.setState({ userAccount: account });
    // });
  }

  handleClick(e) {
    window.location = e.target.href;
  }

  handleSignOut(e) {
    e.preventDefault();
    $.ajax({
      url: e.target.href,
      type: 'DELETE',
      data: {
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    }).done(function (data) {
      window.location = "/";
    });
  }

  render() {
    var rightMenu;
    if (this.props.currentUser) {
      rightMenu = (
        <Nav pullRight>
          <NavDropdown eventKey={3} title={`Account`} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} href={`/users/${this.props.currentUser.id}/dashboard`} onClick={this.handleClick}>{`Dashboard`}</MenuItem>
            <MenuItem eventKey={3.2} href="#">{`Saved Jobs`}</MenuItem>
            <MenuItem eventKey={3.3} href="#">{`Applications`}</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.9} href="#">{`Settings`}</MenuItem>
          </NavDropdown>
          <NavItem eventKey={2} href="/users/sign_out" onClick={this.handleSignOut}>{`Sign out`}</NavItem>
        </Nav>
      );
    } else {
      rightMenu = (
        <Nav pullRight>
          <NavItem eventKey={1} href="/users/sign_in" onClick={this.handleClick}>{`Sign in`}</NavItem>
          <NavItem eventKey={2} href="/users/sign_up" onClick={this.handleClick}>{`Sign up`}</NavItem>
        </Nav>
      );
    }

    var notice;
    if (this.props.notice) {
      notice = (
        <Alert bsStyle="warning" className="notice">
          <span>{this.props.notice}</span>
        </Alert>
      );
      setTimeout(() => {
        document.getElementsByClassName('alert')[0].remove();
      }, 3000);
    }

    var alert;
    if (this.props.alert) {
      alert = (
        <Alert bsStyle="warning">
          <span>{this.props.alert}</span>
        </Alert>
      );
      setTimeout(() => {
        document.getElementsByClassName('alert')[0].remove();
      }, 3000);
    }

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">TechHunt</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {rightMenu}
          </Navbar.Collapse>
        </Navbar>

        {notice}
        {alert}

        {this.props.children}

        <Navbar inverse fixedBottom>
        </Navbar>
      </div>
    );
  }
}
