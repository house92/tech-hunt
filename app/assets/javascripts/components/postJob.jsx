import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio, Checkbox, Button, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import GoogleMapsAPI from 'googlemaps';
import Header from './header.jsx';

const gradings = ["Junior", "Mid-level", "Senior"];

var publicConfig = {
  key: 'AIzaSyBYJKE9jxmgO3wCjiUN_jlu5x3PJcd0veA',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false
};
var gmAPI = new GoogleMapsAPI(publicConfig);

export default class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      benefits: [],
      lat: "",
      lng: "",
      city: "",
      country: "",
      postcode: "",
      offersVisa: false
    };
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleAddBenefit = this.handleAddBenefit.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  handleAddSkill(e) {
    e.preventDefault();
    this.setState({ skills: this.state.skills.conact([e.target.value]) });
    e.target.value = "";
  }

  handleAddBenefit(e) {
    e.preventDefault();
    this.setState({ benefits: this.state.benefits.conact([e.target.value]) });
    e.target.value = "";
  }

  updateLocation(e) {
    var nextState = _.cloneDeep(this.state);
    nextState[e.target.name] = e.target.value;

    this.setState(nextState);
  }

  getLatLng() {
    gmAPI.geocode( { address: [this.state.city, this.state.country, this.state.postcode].join(', ')}, (err, results) => {
      if (results.status == 'OK') {
        this.setState({ lat: results.results[0].geometry.location.lat, lng: results.results[0].geometry.location.lng });
      } else {
        alert('Geocode was not successful for the following reason: ' + err);
      }
    });
  }

  toggleCheckbox(e) {
    this.setState({ offersVisa: e.target.checked });
  }

  render() {
    const gradingOptions = gradings.map((grading, i) => {
      return <option value={grading} key={`grading${i + 1}`}>{grading}</option>;
    });

    var hiddenSkills = this.state.skills.map((skill, i) => {
      return <FormControl type="hidden" name="skills[name]" value={skill} key={`skill${i + 1}`} />;
    });

    var hiddenBenfits = this.state.skills.map((benefit, i) => {
      return <FormControl type="hidden" name="benefits[name]" value={benefit} key={`benefit${i + 1}`} />;
    });

    var hiddenLatLng = (
      <div>
        <FormControl type="hidden" name="location" value={[this.state.city, this.state.country].join(', ')} />
        <FormControl type="hidden" name="lat" value={this.state.lat} />
        <FormControl type="hidden" name="lng" value={this.state.lng} />
      </div>
    );

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <Row>
          <Col xs={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <h1>{`New job`}</h1>
            <div>{`Enter the details for the job:`}</div>
            <form action="/jobs" method="POST">

              <FormGroup controlId="control-title">
                <ControlLabel>{`Title:`}</ControlLabel>
                <FormControl type="text" name="title" required />
              </FormGroup>

              <FormGroup controlId="control-location">
                <ControlLabel>{`Town/City:`}</ControlLabel>
                <FormControl type="text" name="city" onKeyUp={this.updateLocation} required />
                <ControlLabel>{`Country:`}</ControlLabel>
                <FormControl type="text" name="country" onKeyUp={this.updateLocation} required />
                <ControlLabel>{`Post/Zip Code:`}</ControlLabel>
                <FormControl type="text" name="postcode" onKeyUp={this.updateLocation} required />
                {hiddenLatLng}
                <Button type="button" onClick={this.getLatLng}>{`Find`}</Button>
              </FormGroup>

              <FormGroup controlId="control-salary">
                <ControlLabel>{`Salary:`}</ControlLabel>
                <FormControl type="number" name="salary" required />
              </FormGroup>

              <FormGroup controlId="control-grading">
                <ControlLabel>{`Grading:`}</ControlLabel>
                <FormControl componentClass="select" name="grading" required>
                  {gradingOptions}
                </FormControl>
              </FormGroup>

              <FormGroup controlId="control-full-time">
                <Radio name="full_time" value={true} defaultChecked inline>{`Full-time`}</Radio>
                <Radio name="full_time" value={false} inline>{`Part-time`}</Radio>
              </FormGroup>

              <FormGroup controlId="control-contract">
                <Radio name="contract" value={false} defaultChecked inline>{`Permanent`}</Radio>
                <Radio name="contract" value={true} inline>{`Contract`}</Radio>
              </FormGroup>

              <FormGroup controlId="control-offers-visa">
                <Checkbox name="offers_visa" value={this.state.offersVisa} checked={this.state.offersVisa} onClick={this.toggleCheckbox}>{`Visa sponsorship available`}</Checkbox>
              </FormGroup>

              <FormGroup controlId="control-skills">
                <ControlLabel>{`Relevant skills:`}</ControlLabel>
                <FormControl type="text" onKeyPress={this.handleAddSkill} key={13} />
                {hiddenSkills}
                <div>{this.state.skills}</div>
                <HelpBlock>{`Please hit enter after each skill`}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="control-benefits">
                <ControlLabel>{`Available benefits:`}</ControlLabel>
                <FormControl type="text" onKeyPress={this.handleAddBenefit} key={13} />
                {hiddenBenfits}
                <div>{this.state.benefits}</div>
                <HelpBlock>{`Please hit enter after each skill`}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="control-description">
                <ControlLabel>{`Description:`}</ControlLabel>
                <FormControl componentClass="textarea" name="description" required />
              </FormGroup>

              <Button type="submit">{`Submit`}</Button>
            </form>
          </Col>
        </Row>
      </Header>
    );
  }
}
