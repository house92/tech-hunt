import React, { Component } from 'react';
import { Row, Col, InputGroup, ControlLabel, FormGroup, FormControl, Checkbox, Button, Collapse } from 'react-bootstrap';
import _ from 'lodash';
import GoogleMapsAPI from 'googlemaps';
import SearchForm from './searchForm.jsx';
import SearchFilters from './searchFilters.jsx';

var publicConfig = {
  key: 'AIzaSyBYJKE9jxmgO3wCjiUN_jlu5x3PJcd0veA',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false
};
var gmAPI = new GoogleMapsAPI(publicConfig);

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedSearchOpen : false,
      title: "",
      location: "",
      lat: "",
      lng: "",
      grading: "Junior",
      min_salary: "",
      max_salary: "",
      full_time: false,
      part_time: true,
      permanent: true,
      contract: false,
      offers_visa: false
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.toggleAdvancedSearch = this.toggleAdvancedSearch.bind(this);
    this.handlePositiveCheck = this.handlePositiveCheck.bind(this);
    this.handleNegativeCheck = this.handleNegativeCheck.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
  }

  toggleAdvancedSearch() {
    this.setState({ advancedSearchOpen: !this.state.advancedSearchOpen });
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
    return (
      <div className="form">
        <div className="basic-search">
          <SearchForm search={this.state} onValueChange={this.handleValueChange} getLatLng={this.getLatLng} />
        </div>

        <Button type="button" className="pull-right" onClick={this.toggleAdvancedSearch}>{`Advanced search`}</Button>
        <Collapse in={this.state.advancedSearchOpen}>
          <div className="advanced-search">

            <SearchFilters search={this.state} onValueChange={this.handleValueChange} onPositiveClick={this.handlePositiveCheck} onNegativeClick={this.handleNegativeCheck} />

          </div>
        </Collapse>

      </div>
    );
  }
}
