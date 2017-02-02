import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import ApplicationShow from '../app/assets/javascripts/components/applicationShow.js';
import { expect } from 'chai';

describe('Reading an application', () => {
  const hunter = {
    first_name: "Wanda",
    last_name: "Maximoff",
    id: 0
  }

  const job = {
    title: "Tech Wizard",
    id: 0
  }

  const application = {
    hunter: hunter,
    job: job,
    body: "I can move things with my mind. That's what you meant, right?"
  }

  describe('render', () => {
    it('should show the name of the applicant as a link', () => {
      const component = renderIntoDocument(
        <ApplicationShow application={application} />
      );

      const applicantName = findRenderedDOMComponentWithClass(component, 'name');
      const nameLink = applicantName.getElementsByTagName('a');
      expect(nameLink.length).to.eql(1);
      expect(applicantName.textContent).to.eql(`${application.hunter.first_name} ${application.hunter.last_name}`);
    });

    it('should show the title of the job as a link', () => {
      const component = renderIntoDocument(
        <ApplicationShow application={application} />
      );

      const jobTitle = findRenderedDOMComponentWithClass(component, 'title');
      const titleLink = jobTitle.getElementsByTagName('a');
      expect(titleLink.length).to.eql(1);
      expect(jobTitle.textContent).to.eql(application.job.title);
    });

    it('should show the body of the application', () => {
      const component = renderIntoDocument(
        <ApplicationShow application={application} />
      );

      const applicationBody = findRenderedDOMComponentWithClass(component, 'body');
      expect(applicationBody.textContent).to.eql(application.body);
    });
  });
});
