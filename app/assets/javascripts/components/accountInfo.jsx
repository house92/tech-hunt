import React, { Component } from 'react';

export default class AccountInfo extends Component {
  render() {
    return (
      <div>
        <h1 className="name">{this.props.account.first_name ? `${this.props.account.first_name} ${this.props.account.last_name}` : this.props.account.company_name}</h1>
        <div className="location">{this.props.account.location}</div>
        <div className="bio">{this.props.account.bio}</div>
      </div>
    );
  }
}
