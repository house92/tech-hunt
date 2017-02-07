import React, { Component } from 'react';
import { Row, Col, InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button, Collapse } from 'react-bootstrap';
import _ from 'lodash';
import Header from './header.jsx';
import Result from './result.jsx';
import SearchForm from './searchForm.jsx';
import SearchFilters from './searchFilters.jsx';

export default class ResultsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.search.title,
      location: this.props.search.location,
      lat: this.props.search.lat,
      lng: this.props.search.lng,
      grading: this.props.search.grading,
      min_salary: this.props.search.min_salary,
      max_salary: this.props.search.max_salary,
      full_time: this.props.search.full_time == "true",
      part_time: this.props.search.part_time == "true",
      permanent: this.props.search.permanent == "true",
      contract: this.props.search.contract == "true",
      offers_visa: this.props.search.offers_visa == "true"
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handlePositiveCheck = this.handlePositiveCheck.bind(this);
    this.handleNegativeCheck = this.handleNegativeCheck.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
  }

  handleValueChange(e) {
    var nextState = _.cloneDeep(this.state)

    nextState[e.target.name] = e.target.value

    this.setState(nextState);
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

  getLatLng(e) {
    e.preventDefault();
    const form = document.getElementsByTagName('form')[0];
    gmAPI.geocode( { address: this.state.location }, (err, results) => {
      if (results.status == 'OK') {
        this.setState({ lat: results.results[0].geometry.location.lat, lng: results.results[0].geometry.location.lng }, () => {
          form.submit();
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + err);
      }
    });
  }

  render() {
    const results = this.props.jobs.map((job, i) => {
      return <Result key={`results${i + 1}`} job={job} />;
    });

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <SearchForm search={this.state} onValueChange={this.handleValueChange} />
        </Row>
        <Row>
          <Col md={3}>
            <SearchFilters search={this.state} onValueChange={this.handleValueChange} onPositiveClick={this.handlePositiveCheck} onNegativeClick={this.handleNegativeCheck} />
          </Col>
          <Col md={9}>
            <div>{`Your search returned ${this.props.jobs.length} result${this.props.jobs.length == 1 ? "" : "s"}.`}</div>
            <div className="results">
              {results}
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}
