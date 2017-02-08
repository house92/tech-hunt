import React, { Component } from 'react';
import { Row, Col, InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button } from 'react-bootstrap';

const gradings = ["Junior", "Mid-level", "Senior"];

export default class SearchFilters extends Component {
  render() {
    const gradingsOptions = gradings.map((grading, i) => {
      return <option key={`grading${i + 1}`} value={grading}>{grading}</option>;
    });

    return (
      <div className="search-filter">
        <FormGroup controlId="formControlsGrading">
          <ControlLabel>{`Grading:`}</ControlLabel>
          <FormControl componentClass="select" name="grading" defaultValue={this.props.search.grading} onChange={this.props.onValueChange}>
            {gradingsOptions}
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSalary">
          <ControlLabel>{`From`}</ControlLabel>
          <FormControl type="number" min={0} name="min_salary" defaultValue={this.props.search.min_salary} onChange={this.props.onValueChange} />
          <ControlLabel>{`to`}</ControlLabel>
          <FormControl type="number" min={0} name="max_salary" defaultValue={this.props.search.max_salary} onChange={this.props.onValueChange} />
        </FormGroup>

        <FormGroup controlId="formControlsTime">
          <Row>
            <Col xs={6} md={window.location.pathname == '/' ? 3 : 6}>
              <Checkbox id="full_time" checked={this.props.search.full_time} data-name="full_time" onChange={this.props.onPositiveClick} inline>{`Full-time`}</Checkbox>
            </Col>
            <Col xs={6} md={window.location.pathname == '/' ? 3 : 6}>
              <Checkbox checked={!this.props.search.part_time} data-name="part_time" onChange={this.props.onNegativeClick} inline>{`Part-time`}</Checkbox>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup controlId="formControlsDuration">
          <Row>
            <Col xs={6} md={window.location.pathname == '/' ? 3 : 6}>
              <Checkbox checked={!this.props.search.permanent} data-name="permanent" onChange={this.props.onNegativeClick} inline>{`Permanent`}</Checkbox>
            </Col>
            <Col xs={6} md={window.location.pathname == '/' ? 3 : 6}>
              <Checkbox checked={this.props.search.contract} data-name="contract" onChange={this.props.onPositiveClick} inline>{`Contract`}</Checkbox>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup controlId="formControlsVisa">
          <Checkbox checked={this.props.search.offers_visa} data-name="offers_visa" onChange={this.props.onPositiveClick} inline>{`Offers visa`}</Checkbox>
        </FormGroup>
      </div>
    );
  }
}
