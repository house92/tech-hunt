import React, { Component } from 'react';
import { Row, Col, InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button, Collapse } from 'react-bootstrap';
import _ from 'lodash';

const gradings = ["Junior", "Mid-level", "Senior"];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedSearchOpen : false,
      full_time: false,
      part_time: true,
      permanent: true,
      contract: false,
      offers_visa: false
    };
    this.toggleAdvancedSearch = this.toggleAdvancedSearch.bind(this);
    this.handlePositiveCheck = this.handlePositiveCheck.bind(this);
    this.handleNegativeCheck = this.handleNegativeCheck.bind(this);
  }

  toggleAdvancedSearch() {
    this.setState({ advancedSearchOpen: !this.state.advancedSearchOpen });
  }

  handlePositiveCheck(e) {
    var nextState = _.cloneDeep(this.state)

    nextState[e.target.dataset.name] = e.target.checked

    this.setState(nextState);
  }

  handleNegativeCheck(e) {
    var nextState = _.cloneDeep(this.state)

    nextState[e.target.dataset.name] = !e.target.checked

    this.setState(nextState);
  }

  render() {
    const gradingsOptions = gradings.map((grading, i) => {
      return <option key={`grading${i + 1}`} value={grading}>{grading}</option>;
    });

    return (
      <form action="/jobs" method="GET">
        <div className="basic-search">
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
        </div>

        <Button type="button" className="pull-right" onClick={this.toggleAdvancedSearch}>{`Advanced search`}</Button>
        <Collapse in={this.state.advancedSearchOpen}>
          <div className="advanced-search">

            <FormGroup controlId="formControlsGrading">
              <ControlLabel>{`Grading:`}</ControlLabel>
              <FormControl componentClass="select" name="grading">
                {gradingsOptions}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSalary">
              <ControlLabel>{`From`}</ControlLabel>
              <FormControl type="number" min={0} name="min_salary" />
              <ControlLabel>{`to`}</ControlLabel>
              <FormControl type="number" min={0} name="max_salary" />
            </FormGroup>

            <FormGroup controlId="formControlsTime">
              <Row>
                <Col xs={6} md={3}>
                  <Checkbox checked={this.state.full_time} data-name="full_time" onClick={this.handlePositiveCheck} inline>{`Full-time`}</Checkbox>
                  <FormControl type="hidden" name="full_time" value={this.state.full_time} />
                </Col>
                <Col xs={6} md={3}>
                  <Checkbox checked={!this.state.part_time} data-name="part_time" onClick={this.handleNegativeCheck} inline>{`Part-time`}</Checkbox>
                  <FormControl type="hidden" name="part_time" value={this.state.part_time} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formControlsDuration">
              <Row>
                <Col xs={6} md={3}>
                  <Checkbox checked={!this.state.permanent} data-name="permanent" onClick={this.handleNegativeCheck} inline>{`Permanent`}</Checkbox>
                  <FormControl type="hidden" name="permanent" value={this.state.permanent} />
                </Col>
                <Col xs={6} md={3}>
                  <Checkbox checked={this.state.contract} data-name="contract" onClick={this.handlePositiveCheck} inline>{`Contract`}</Checkbox>
                  <FormControl type="hidden" name="contract" value={this.state.contract} />
                </Col>
              </Row>
            </FormGroup>

            <FormGroup controlId="formControlsVisa">
              <Checkbox checked={this.state.offers_visa} data-name="offers_visa" onClick={this.handlePositiveCheck} inline>{`Offers visa`}</Checkbox>
              <FormControl type="hidden" name="offers_visa" value={this.state.offers_visa} />
            </FormGroup>

          </div>
        </Collapse>

      </form>
    );
  }
}
