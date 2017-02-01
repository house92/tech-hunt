import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import Header from '../app/assets/javascripts/components/header.js';
import { expect } from 'chai';

describe('Header', () => {
  describe('render', () => {
    it('should show the right number of nav items', () => {
      const component = renderIntoDocument(
        <Header />
      );

      const aElements = scryRenderedDOMComponentsWithTag(component, 'a');
      expect(aElements.length).to.eql(3);
      expect(aElements[aElements.length - 1].textContent).to.eql('Sign up');
    });

  });

  describe('view when signed in', () => {
    it('should show different option for a signed in user', () => {
      const component = renderIntoDocument(
        <Header currentUser={"Batman"}/>
      );

      const aElements = scryRenderedDOMComponentsWithTag(component, 'a');
      expect(aElements.map((el) => { return el.textContent })).to.include('Sign out');
    });
  });

});
