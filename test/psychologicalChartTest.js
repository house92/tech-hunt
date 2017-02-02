import React from 'react';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import PsychologicalChart from '../app/assets/javascripts/components/psychologicalChart.js';
import { expect } from 'chai';

describe('Psychological Chart', () => {
  const bigFive = {
    name: "Big Five",
    data: {
      openness: 0.8,
      conscientiousness: 0.775,
      extraversion: 0.675,
      agreeableness: 0.625,
      stability: 0.625
    }
  }

  const hunter1 = {
    first_name: "Wanda",
    last_name: "Maximoff",
    bigFive: bigFive,
    id: 0
  }

  const user = {
    account_type: "hunter",
    hunter: hunter1,
    id: 0
  }
  describe('render', () => {
    it('should state the name of the test', () => {
      const test = ""
      const component = renderIntoDocument(
        <PsychologicalChart user={user} test={user.hunter.bigFive.name} data={user.hunter.bigFive.data} />
      );

      const name = findRenderedDOMComponentWithClass(component, 'name');
      expect(name.textContent).to.eql(bigFive.name);
    });

    it('should display an svg chart', () => {
      const component = renderIntoDocument(
        <PsychologicalChart user={user} test={user.hunter.bigFive.name} data={user.hunter.bigFive.data} />
      );

      setTimeout(() => {
        const chart = findRenderedDOMComponentWithTag(component, 'svg');
        expect(chart).to.be.ok;
      }, 1);
    });
  });
});
