import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import EditProfile from '../app/assets/javascripts/components/editProfile.js';
import { expect } from 'chai';

describe('Edit Profile', () => {
  const employer1 = {
    company_name: "S.H.I.E.L.D.",
    location: "Undisclosed"
    bio: "Keeping the world safe."
    id: 0
  }

  const hunter1 = {
    first_name: "Wanda",
    last_name: "Maximoff",
    location: "Sokovia",
    bio: "Fighting evil. Within and without.",
    id: 0
  }

  const user1 = {
    account_type: "employer",
    employer: employer1,
    id: 0
  }

  const user2 = {
    account_type: "hunter",
    hunter: hunter1,
    id: 1
  }

  describe('render', () => {
    it('should display a form', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user2} />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      expect(form).to.be.ok;
    });
    it('should prepopulate the fields with the correct data for a hunter', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user2} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'inputs');
      const firstName = inputs[0];
      const lastName = inputs[1];
      const location = inputs[2];
      const bio = findRenderedDOMComponentWithTag(component, 'textarea');

      expect(inputs.value).to.eql(user.hunter.inputs);
      expect(firstName.value).to.eql(user.hunter.first_name);
      expect(lastName.value).to.eql(user.hunter.last_name);
      expect(location.value).to.eql(user.hunter.location);
      expect(bio.value).to.eql(user.hunter.bio);
    });
    it('should prepopulate the fields with the correct data for an employer', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user1} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'inputs');
      const companyName = inputs[0];
      const location = inputs[1];
      const bio = findRenderedDOMComponentWithTag(component, 'textarea');

      expect(inputs.value).to.eql(user.hunter.inputs);
      expect(companyName.value).to.eql(user.hunter.company_name);
      expect(location.value).to.eql(user.hunter.location);
      expect(bio.value).to.eql(user.hunter.bio);
    });
  });
});
