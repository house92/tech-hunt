import React, { Component } from 'react';
import { ControlLabel, FormGroup, FormControl, Checkbox, Button } from 'react-bootstrap';

export default class Search extends Component {
  render() {
    return (
      <form>
        <FieldGroup id="formControlsText" type="text" name="search" />
        <Button type="submit">{`Go hunting`}</Button>
      </form>
    );
  }
}

function FieldGroup({ id, label, help, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
