import React from 'react';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import PsychologicalTest from '../app/assets/javascripts/components/psychologicalTest.js';
import { expect } from 'chai';

describe('Psychological Test', () => {
  describe('render', () => {
    it('should present a dropdown to select test', () => {
      const component = renderIntoDocument(
        <PsychologicalTest />
      );

      const dropdown = findRenderedDOMComponentWithTag(component, 'select');
      expect(dropdown).to.be.ok;
    });

    it('should present a submit button', () => {
      const component = renderIntoDocument(
        <PsychologicalTest />
      );

      const button = findRenderedDOMComponentWithTag(component, 'button');
      expect(button).to.be.ok;
    });

    it('should default to the Big Five', () => {
      const component = renderIntoDocument(
        <PsychologicalTest />
      );

      const testName = findRenderedDOMComponentWithClass(component, 'name');
      const questions = scryRenderedDOMComponentsWithClass(component, 'question');
      expect(testName.textContent).to.eql('Big Five');
      expect(questions.length).to.eql(50);
    });
  });

  describe('selecting a test', () => {
    it('should change the form', () => {
      const component = renderIntoDocument(
        <PsychologicalTest />
      );

      const dropdown = findRenderedDOMComponentWithTag(component, 'select');
      Simulate.change(dropdown, { target: { value: 'myersBriggs'} });

      const testName = findRenderedDOMComponentWithClass(component, 'name');
      const questions = scryRenderedDOMComponentsWithClass(component, 'question');
      expect(testName.textContent).to.eql('Myers-Briggs');
      expect(questions.length).to.eql(64);
    });
  });
});
