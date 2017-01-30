import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';
import Registration from '../app/assets/javascripts/components/registration.jsx';
import { expect } from 'chai';

describe('Registration', () => {
  describe('selecting a hunter account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs.length).to.eql(5);
      expect(inputs[4].getAttribute('name')).to.eql('lastName');
    });
  });

  describe('selecting an employer account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs.length).to.eql(4);
      expect(inputs[3].getAttribute('name')).to.eql('companyName');
    });
  });
});
