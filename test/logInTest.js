import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import LogIn from '../app/assets/javascripts/components/logIn.js';
import { expect } from 'chai';

describe('LogIn', () => {
  describe('render', () => {
    it('should display a login form', () => {
      const component = renderIntoDocument(
        <LogIn />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      expect(form).to.be.ok;
    });
  });

  describe('entering text', () => {
    it('should update the state when text is entered', () => {
      const component = renderIntoDocument(
        <LogIn />
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
});
