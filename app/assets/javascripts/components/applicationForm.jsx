import React, { Component } from 'react';
import { Row, Col, FormControl, HelpBlock, Button } from 'react-bootstrap';
import Header from './header.jsx';
import Functions from '../../../../lib/functions.js';

const characterLimit = 3000;

export default class ApplicationForm extends Component {
  render() {
    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <div className="application">
              <h1>{`Application for ${this.props.job.title}`}</h1>
              <div>{`Write your cover letter out below:`}</div>
              <form action={`/jobs/${this.props.job.id}/applications`} method="POST">
                <FormControl componentClass="textarea" name="body" maxLength={characterLimit} />
                <HelpBlock>{`Character limit: ${characterLimit}`}</HelpBlock>
                <FormControl type="hidden" name="authenticity_token" value={Functions.getMetaContent("csrf-token")} />
                <Row>
                  <Col xs={12} sm={4} smOffset={4} md={2} mdOffset={5}>
                    <Button type="submit" className="btn btn-primary">{`Apply`}</Button>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}
