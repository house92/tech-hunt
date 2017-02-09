import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash';
import Functions from '../../../../lib/functions.js';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.userInfo;
    this.handleValueChange = this.handleValueChange.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
  }

  updateAccount() {
    const update = {};
    update[this.props.currentUser.account_type] = this.state;
    update.authenticity_token = Functions.getMetaContent("csrf-token");
    $.ajax({
      url: `/${this.props.currentUser.account_type}s/${this.props.userInfo.id}.json`,
      method: 'PATCH',
      data: update
    }).done((data) => {
      console.log("updating", data);
      this.props.updateParentInfo(data);
    });
  }

  handleValueChange(e) {
    var nextState = _.cloneDeep(this.state)

    nextState[e.target.name] = e.target.value

    this.setState(nextState);
  }

  render() {
    const inputs = Object.keys(this.state).filter((key) => { return key != "id" && key != "created_at" && key != "user_id" && key != "updated_at" && key != "bio" }).map((key) => {
      return (
        <FormGroup controlId={`controlFor${key}`} key={key}>
          <ControlLabel>{`${key.split("_").map((word) => { return word[0].toUpperCase() + word.substr(1, 99) }).join(" ")}:`}</ControlLabel>
          <FormControl type="text" name={key} value={this.state[key] ? this.state[key] : ""} onChange={this.handleValueChange} />
        </FormGroup>
      );
    });

    return (
      <form>
        {inputs}
        <FormGroup controlId="controlForBio">
          <ControlLabel>{`Biography:`}</ControlLabel>
          <FormControl componentClass="textarea" name="bio" value={this.state.bio ? this.state.bio : ""} onChange={this.handleValueChange} />
        </FormGroup>
        <Button type="button" onClick={this.updateAccount}>{`Update`}</Button>
      </form>
    );
  }
}
