import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Dashboard from '../app/assets/javascripts/components/dashboard.js';
import { expect } from 'chai';

describe('Dashboard', () => {
  describe('render', () => {
    const employer = {
      company_name: "S.H.I.E.L.D.",
      id: 0
    }

    const job = {
      title: "Tech Wizard",
      employer: employer,
      id: 0
    }

    const hunter1 = {
      first_name: "Wanda",
      last_name: "Maximoff",
      id: 0
    }

    const application1 = {
      hunter: hunter1,
      job: job,
      body: "I can move things with my mind. That's what you meant, right?",
      created_at: new Date(),
      id: 0
    }

    const hunter2 = {
      first_name: "The",
      last_name: "Vision",
      id: 1
    }

    const application2 = {
      hunter: hunter2,
      job: job,
      body: "I am one with machines.",
      created_at: new Date(),
      id: 1
    }
    it("should show a hunter's sent applications", () => {
      const user = {
        account_type: "hunter",
        hunter: hunter1
      }
      const applicationsArray = [application1];
      const component = renderIntoDocument(
        <Dashboard currentUser={user} applications={applicationsArray} />
      );

      const applicationsList = findRenderedDOMComponentWithClass(component, 'applications');
      const applications = applicationsList.getElementsByClassName('application');

      expect(applicationsList).to.be.ok;
      expect(applications.length).to.eql(applicationsArray.length);
    });
    //
    // it("should show a hunter's saved jobs", () => {
    //   const component = renderIntoDocument(
    //     <Dashboard />
    //   );
    // });
    //
    // it("should show a hunter's personality chart options", () => {
    //   const component = renderIntoDocument(
    //     <Dashboard />
    //   );
    // });
    //
    it("should show an employer's received applications", () => {
      const user = {
        account_type: "employer",
        employer: employer
      }
      const applicationsArray = [application1, application2];
      const component = renderIntoDocument(
        <Dashboard currentUser={user} applications={applicationsArray} />
      );

      const applicationsList = findRenderedDOMComponentWithClass(component, 'applications');
      const applications = applicationsList.getElementsByClassName('application');

      expect(applicationsList).to.be.ok;
      expect(applications.length).to.eql(applicationsArray.length);
    });
    //
    // it("should show an employer's posted jobs", () => {
    //   const component = renderIntoDocument(
    //     <Dashboard />
    //   );
    // });
  });
});
