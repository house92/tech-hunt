import React, { Component } from 'react';

export default class ApplicationShow extends Component {
  render() {
    return (
      <div className="application">
        <div className="title"><a href={`/job/${this.props.application.job.id}`}>{this.props.application.job.title}</a></div>
      <div className="name"><a href={`/hunter/${this.props.application.hunter.id}`}>{`${this.props.application.hunter.first_name} ${this.props.application.hunter.last_name}`}</a></div>
        <div className="body">
          {this.props.application.body}
        </div>
      </div>
    );
  }
}
