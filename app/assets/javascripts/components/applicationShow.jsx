import React, { Component } from 'react';
import Header from './header.jsx';

export default class ApplicationShow extends Component {
  render() {
    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <div className="application">
          <div className="title"><a href={`/jobs/${this.props.job.id}`}>{this.props.job.title}</a></div>
          <div className="name"><a href={`/hunters/${this.props.hunter.id}`}>{`${this.props.hunter.first_name} ${this.props.hunter.last_name}`}</a></div>
          <div className="body">
            {this.props.application.body}
          </div>
        </div>
      </Header>
    );
  }
}
