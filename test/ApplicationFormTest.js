import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import ApplicationForm from '../app/assets/javascripts/components/applicationForm.js';
import { expect } from 'chai';

describe('Application Form', () => {
  const job = {
    title: "Tech Wizard",
    id: 0
  }

  describe('render', () => {
    it('should display a form with submit button', () => {
      const component = renderIntoDocument(
        <ApplicationForm job={job} />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      const applicationContainer = findRenderedDOMComponentWithClass(component, 'application');
      const button = applicationContainer.getElementsByTagName('button');

      expect(form).to.be.ok;
      expect(button.length).to.eql(1);
    });

    it('should build a textarea for the body', () => {
      const component = renderIntoDocument(
        <ApplicationForm job={job} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'textarea');
      expect(inputs.length).to.eql(1);
    });
  });
});
