import React, { Component } from 'react';
import { InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button, Collapse } from 'react-bootstrap';

const gradings = ["Junior", "Mid-level", "Senior"];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { advancedSearchOpen : false };
    this.toggleAdvancedSearch = this.toggleAdvancedSearch.bind(this);
  }

  toggleAdvancedSearch() {
    this.setState({ advancedSearchOpen: !this.state.advancedSearchOpen });
  }

  render() {
    const gradingsOptions = gradings.map((grading, i) => {
      return <option key={`grading${i + 1}`} value={grading}>{grading}</option>;
    });

    return (
      <form>
        <div className="basic-search">
          <FormGroup controlId="formControlsTitle">
            <FormControl type="text" name="title" placeholder="Search jobs" />
          </FormGroup>

          <span>{` in `}</span>

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
              <FormControl componentClass="select">
                {gradingsOptions}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSalary">
              <ControlLabel>{`From`}</ControlLabel>
              <FormControl type="number" />
              <ControlLabel>{`to`}</ControlLabel>
              <FormControl type="number" />
            </FormGroup>

            <FormGroup controlId="formControlsTime">
              <Checkbox inline>{`Full-time`}</Checkbox>
              <Checkbox inline>{`Part-time`}</Checkbox>
            </FormGroup>

            <FormGroup controlId="formControlsDuration">
              <Checkbox inline>{`Permanent`}</Checkbox>
              <Checkbox inline>{`Contract`}</Checkbox>
            </FormGroup>

            <FormGroup controlId="formControlsVisa">
              <Checkbox inline>{`Offers visa`}</Checkbox>
            </FormGroup>

          </div>
        </Collapse>

      </form>
    );
  }
}
