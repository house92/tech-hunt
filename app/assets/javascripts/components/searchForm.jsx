import React, { Component } from 'react';
import { Row, Col, InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button, Collapse } from 'react-bootstrap';

export default class SearchForm extends Component {
  render() {
    var filler;
    if (window.innerWidth >= 500) {
      filler = (
        <Col md={1}>
          <span>{window.innerWidth >= 500 ? ` in ` : ``}</span>
        </Col>
      );
    }

    const hiddenValues = Object.keys(this.props.search).map((key, i) => {
      return <FormControl key={`state${i}`} type="hidden" name={key} value={this.props.search[`${key}`]} />;
    });

    if (window.location.pathname == "/") {
      return (
        <form action="/jobs" method="GET">
          <FormGroup controlId="formControlsTitle">
            <FormControl type="text" name="title" placeholder="Search jobs" />
          </FormGroup>

          <span>{window.innerWidth >= 500 ? ` in ` : ``}</span>

          <FormGroup controlId="formControlsLocation">
            <InputGroup>
              <FormControl type="text" name="location" placeholder="Location" />
              <InputGroup.Button>
                <Button type="submit">{`Go hunting`}</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          {hiddenValues}
        </form>
      );
    } else {
      return (
        <form action="/jobs" method="GET">
          <Col xs={12} md={5}>
            <FormGroup controlId="formControlsTitle">
              <FormControl type="text" name="title" placeholder="Search jobs" defaultValue={this.props.search.title} />
            </FormGroup>
          </Col>
          {filler}
          <Col xs={12} md={6}>
            <FormGroup controlId="formControlsLocation">
              <InputGroup>
                <FormControl type="text" name="location" placeholder="Location" defaultValue={this.props.search.location} />
                <InputGroup.Button>
                  <Button type="submit">{`Go hunting`}</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Col>
          {hiddenValues}
        </form>
      );
    }
  }
}
