import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import ApplicationsContainer from '../app/assets/javascripts/components/applicationsContainer.js';
import { expect } from 'chai';

describe('ApplicationsContainer', () => {
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

    it('should display a list of applications', () => {
      const user = {
        account_type: "employer",
        employer: employer
      }
      const applicationsArray = [application1, application2];
      const component = renderIntoDocument(
        <ApplicationsContainer currentUser={user} applications={applicationsArray} />
      );

      const applicationDivs = scryRenderedDOMComponentsWithClass(component, 'application');
      expect(applicationDivs.length).to.eql(applicationsArray.length);
    });

    it('should link provide links to each application', () => {
      const user = {
        account_type: "employer",
        employer: employer
      }
      const applicationsArray = [application1, application2];
      const component = renderIntoDocument(
        <ApplicationsContainer currentUser={user} applications={applicationsArray} />
      );

      const applicationDivs = scryRenderedDOMComponentsWithClass(component, 'application');
      const links = applicationDivs.map((div) => { return div.getElementsByTagName('a')[0] });
      expect(links.length).to.eql(applicationsArray.length);
    });
  });
});
