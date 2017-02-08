import React from 'react';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import PostJob from '../app/assets/javascripts/components/postJob.js';
import { expect } from 'chai';

describe('PostJob', () => {
  describe('render', () => {
    it('should build a form form creating a job listing', () => {
      const component = renderIntoDocument(
        <PostJob />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(form).to.be.ok;
      expect(inputs.length).to.eql(15);
    });
  });

  describe('entering data', () => {
    it('should update its location', () => {
      const component = renderIntoDocument(
        <PostJob />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const cityInput = inputs[1];
      const offersVisa = inputs[inputs.length - 3];

      cityInput.value = "London";
      Simulate.keyUp(cityInput);
      Simulate.change(offersVisa, {target: {checked: true}});

      expect(component.state.city).to.eql("London");
      expect(component.state.offersVisa).to.be.ok;
    });
  });
});
