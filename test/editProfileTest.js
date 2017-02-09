import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import EditProfile from '../app/assets/javascripts/components/editProfile.js';
import { expect } from 'chai';

describe('Edit Profile', () => {
  const employer1 = {
    company_name: "S.H.I.E.L.D.",
    location: "Undisclosed",
    bio: "Keeping the world safe.",
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
        <EditProfile currentUser={user2} userInfo={user2.hunter} />
      );

      const form = findRenderedDOMComponentWithTag(component, 'form');
      expect(form).to.be.ok;
    });
    it('should prepopulate the fields with the correct data for a hunter', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user2} userInfo={user2.hunter} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const firstName = inputs[0];
      const lastName = inputs[1];
      const location = inputs[2];
      const bio = findRenderedDOMComponentWithTag(component, 'textarea');

      expect(firstName.value).to.eql(user2.hunter.first_name);
      expect(lastName.value).to.eql(user2.hunter.last_name);
      expect(location.value).to.eql(user2.hunter.location);
      expect(bio.value).to.eql(user2.hunter.bio);
    });
    it('should prepopulate the fields with the correct data for an employer', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user1} userInfo={user1.employer} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const companyName = inputs[0];
      const location = inputs[1];
      const bio = findRenderedDOMComponentWithTag(component, 'textarea');

      expect(companyName.value).to.eql(user1.employer.company_name);
      expect(location.value).to.eql(user1.employer.location);
      expect(bio.value).to.eql(user1.employer.bio);
    });
  });
  describe('entering data', () => {
    it('should update the state', () => {
      const component = renderIntoDocument(
        <EditProfile currentUser={user1} userInfo={user1.employer} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const companyName = inputs[0];

      companyName.value = 'SHIELD';
      Simulate.change(companyName);

      expect(component.state.company_name).to.eql('SHIELD');
    });
  });
});
