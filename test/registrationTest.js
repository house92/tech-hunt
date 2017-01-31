import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import Registration from '../app/assets/javascripts/components/registration.js';
import { expect } from 'chai';

describe('Registration', () => {
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
