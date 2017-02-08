import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Result from '../app/assets/javascripts/components/result.js';
import { expect } from 'chai';

describe('Result', () => {
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
        <Result job={job} />
      );

      const title = findRenderedDOMComponentWithTag(component, 'h2');
      const description = findRenderedDOMComponentWithClass(component, 'description');
      const salary = findRenderedDOMComponentWithClass(component, 'salary');

      expect(title.textContent).to.eql(job.title);
      expect(description.textContent).to.eql(job.description);
      expect(parseInt(salary.textContent.substr(1, 99))).to.eql(job.salary);
    });
  });
});
