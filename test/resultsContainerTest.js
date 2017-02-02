import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import ResultsContainer from '../app/assets/javascripts/components/resultsContainer.js';
import { expect } from 'chai';

describe('ResultsContainer', () => {
  describe('render', () => {
    const job = {
      title: "Web Developer - Full Stack",
      description: "Full Stack Web Developer to join a small and agile team based in London, working on some exciting great global clients.",
      location: "London, UK",
      salary: 40000,
      full_time: true,
      grading: "Mid-level",
      contract: false,
      offers_visa: false
    };
    it('should display provided job results', () => {
      const component = renderIntoDocument(
        <ResultsContainer jobs={[job]} />
      );

      const container = findRenderedDOMComponentWithClass(component, 'results');
      const title = scryRenderedDOMComponentsWithTag(component, 'h2')[0];
      const description = scryRenderedDOMComponentsWithClass(component, 'description')[0];
      const salary = scryRenderedDOMComponentsWithClass(component, 'salary')[0];

      expect(title.textContent).to.eql(job.title);
      expect(description.textContent).to.eql(job.description);
      expect(parseInt(salary.textContent)).to.eql(job.salary);
    });
  });
});
