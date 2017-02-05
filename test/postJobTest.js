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
      expect(inputs.length).to.eql(12);
    });
  });
});
