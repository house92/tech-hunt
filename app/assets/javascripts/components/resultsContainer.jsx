import React, { Component } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';
import Header from './header.jsx';
import Result from './result.jsx';
import GoogleMapsAPI from 'googlemaps';
import SearchForm from './searchForm.jsx';
import SearchFilters from './searchFilters.jsx';

var publicConfig = {
  key: 'AIzaSyBYJKE9jxmgO3wCjiUN_jlu5x3PJcd0veA',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false
};
var gmAPI = new GoogleMapsAPI(publicConfig);

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

  componentDidMount() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng)}
    });
    // map.addListener('idle', () => {
    //   google.maps.event.trigger(map, 'resize');
    // });
    // map.addListener('tilesloaded', () => {
    //   google.maps.event.trigger(map, 'resize');
    // });
    // map.setZoom( map.getZoom() - 1 );
    // map.setZoom( map.getZoom() + 1 );
    this.props.jobs.forEach((job) => {
      var marker = new google.maps.Marker({
        id: job.id,
        position: {lat: parseFloat(job.lat), lng: parseFloat(job.lng)},
        notes: job.title,
        map: map
      });
      var infowindow = new google.maps.InfoWindow();
      marker.addListener("click", function (){
        var link = document.createElement('a');
        link.href = `/jobs/${job.id}`;
        link.innerHTML = marker.notes;
        infowindow.setContent(link);
        infowindow.open(map, marker);
      });
    });
  }

  render() {
    const results = this.props.jobs.map((job, i) => {
      return <Result key={`results${i + 1}`} job={job} />;
    });

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <div className="results-container">
          <Row>
            <SearchForm search={this.state} getLatLng={this.getLatLng} onValueChange={this.handleValueChange} />
          </Row>
          <Row>
            <Col md={3}>
              <SearchFilters search={this.state} onValueChange={this.handleValueChange} onPositiveClick={this.handlePositiveCheck} onNegativeClick={this.handleNegativeCheck} />
            </Col>
            <Col md={9}>
              <div>{`Your search returned ${this.props.jobs.length} result${this.props.jobs.length == 1 ? "" : "s"}.`}</div>
              <div className="results">
                <Tabs defaultActiveKey={2} id="view-option-tabs">
                  <Tab eventKey={1} title="List">{results}</Tab>
                  <Tab eventKey={2} title="Map">
                    <div id="map"></div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Header>
    );
  }
}
