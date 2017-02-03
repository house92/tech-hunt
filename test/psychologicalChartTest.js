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
    },
    id: 0
  }

  const myersBriggs = {
    name: "Myers-Briggs",
    data: {
      first: {
        name: "E",
        value: -24
      },
      second: {
        name: "N",
        value: -67
      },
      third: {
        name: "T",
        value: 5
      },
      fourth: {
        name: "J",
        value: 31
      }
    },
    id: 1
  }

  const hunter1 = {
    first_name: "Wanda",
    last_name: "Maximoff",
    bigFive: bigFive,
    myersBriggs: myersBriggs,
    id: 0
  }

  const user = {
    account_type: "hunter",
    hunter: hunter1,
    id: 0
  }
  describe('render Big Five', () => {
    it('should state the name of the test', () => {
      const test = ""
      const component = renderIntoDocument(
        <PsychologicalChart user={user} test={user.hunter.bigFive} data={user.hunter.bigFive.data} />
      );

      const name = findRenderedDOMComponentWithClass(component, 'name');
      expect(name.textContent).to.eql(bigFive.name);
    });

    it('should display an svg chart', () => {
      const component = renderIntoDocument(
        <PsychologicalChart user={user} test={user.hunter.bigFive} data={user.hunter.bigFive.data} />
      );

      setTimeout(() => {
        const chart = findRenderedDOMComponentWithTag(component, 'svg');
        expect(chart).to.be.ok;
      }, 1);
    });

    describe('render Myers-Briggs', () => {
      it('should state the name of the test', () => {
        const test = ""
        const component = renderIntoDocument(
          <PsychologicalChart user={user} test={user.hunter.myersBriggs} data={user.hunter.myersBriggs.data} />
        );

        const name = findRenderedDOMComponentWithClass(component, 'name');
        expect(name.textContent).to.eql(myersBriggs.name);
      });

      it('should display an svg chart', () => {
        const component = renderIntoDocument(
          <PsychologicalChart user={user} test={user.hunter.myersBriggs} data={user.hunter.myersBriggs.data} />
        );

        setTimeout(() => {
          const chart = findRenderedDOMComponentWithTag(component, 'svg');
          expect(chart).to.be.ok;
        }, 1);
      });
    });
  });
});
