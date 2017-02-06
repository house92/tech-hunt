import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import JobShow from '../app/assets/javascripts/components/jobShow.js';
import { expect } from 'chai';

describe('Show a job', () => {
  const job = {
    title: "Tech Wizard",
    description: "A highly skilled web developer for part-time role. Must be mutant-friendly.",
    salary: 42000,
    location: "New York, USA",
    lat: 40.7141667,
    lng: -74.0063889,
    grading: "Senior",
    full_time: false,
    contract: false,
    offers_visa: false,
    employer_id: 0
  }

  describe('render', () => {
    it('should show all the details of a job', () => {
      const component = renderIntoDocument(
        <JobShow job={job} />
      );

      const title = findRenderedDOMComponentWithClass(component, 'title');
      const detailsContainer = findRenderedDOMComponentWithClass(component, 'details');
      const details = detailsContainer.getElementsByTagName('div');
      const description = findRenderedDOMComponentWithClass(component, 'description');

      expect(title).to.be.ok;
      expect(details.length).to.eql(8)
      expect(description).to.be.ok;
    });

    it('should provide a button to apply for the job', () => {
      const component = renderIntoDocument(
        <JobShow job={job} />
      );

      const jobContainer = findRenderedDOMComponentWithClass(component, 'job');
      const button = jobContainer.getElementsByTagName('button');
      expect(button.length).to.eql(1);
    });
  });
});
