import React from 'react';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import UserProfile from '../app/assets/javascripts/components/userProfile.js';
import { expect } from 'chai';

describe('User Profile', () => {
  const bigFive = {
    name: "Big Five",
    data: {
      openness: 0.8,
      conscientiousness: 0.775,
      extraversion: 0.675,
      agreeableness: 0.625,
      stability: 0.625
    },
    id: 0
  }

  const hunter1 = {
    first_name: "Wanda",
    last_name: "Maximoff",
    bigFive: bigFive,
    id: 0
  }

  const user1 = {
    email: "scarlet@shield.org",
    account_type: "hunter",
    hunter: hunter1,
    hunter_id: 0,
    id: 0
  }

  const user2 = {
    account_type: "employer",
    id: 2
  }

  describe('render', () => {
    it('should should show a name', () => {
      const component = renderIntoDocument(
        <UserProfile user={user1} account={hunter1} />
      );

      const name = findRenderedDOMComponentWithClass(component, 'name');
      expect(name.textContent).to.eql(`${hunter1.first_name} ${hunter1.last_name}`);
    });
    it('should show location and bio', () => {
      const component = renderIntoDocument(
        <UserProfile user={user1} account={hunter1} />
      );

      const location = findRenderedDOMComponentWithClass(component, 'location');
      const bio = findRenderedDOMComponentWithClass(component, 'bio');

      expect(location).to.be.ok;
      expect(bio).to.be.ok;
    });
    it("it should show a hunter's personality charts", () => {
      const component = renderIntoDocument(
        <UserProfile currentUser={user2} user={user1} account={user1.hunter} bigFive={user1.hunter.bigFive} />
      );

      const charts = scryRenderedDOMComponentsWithClass(component, 'personality-charts');

      expect(charts.length).to.eql(1);
    });
  });
});
