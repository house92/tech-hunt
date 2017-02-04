import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Registration from '../app/assets/javascripts/components/registration.js';
import { expect } from 'chai';

describe('Registration', () => {
  describe('render', () => {
    it('should display a login form', () => {
      const component = renderIntoDocument(
        <Registration />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      expect(form).to.be.ok;
    });
  });

  describe('entering text', () => {
    it('should update the state when text is entered', () => {
      const component = renderIntoDocument(
        <Registration />
      );

      const email = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      email.value = 'tony@stark.com';
      Simulate.change(email);

      const password = scryRenderedDOMComponentsWithTag(component, 'input')[1];
      password.value = 'pepper';
      Simulate.change(password);

      expect(component.state.email).to.eql('tony@stark.com')
      expect(component.state.password).to.eql('pepper')
    });
  });

  describe('selecting a hunter account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs.length).to.eql(7);
      expect(inputs[inputs.length - 1].getAttribute('name')).to.eql('last_name');
    });
  });

  describe('selecting an employer account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const fields = scryRenderedDOMComponentsWithClass(component, 'field')
      const employerRadio = fields[fields.length - 3].getElementsByTagName('input')[1];
      Simulate.click(employerRadio);
      setTimeout(() => {
        expect(inputs.length).to.eql(6);
        expect(inputs[inputs.length - 1].getAttribute('name')).to.eql('companyName');
      }, 1);
    });
  });
});
