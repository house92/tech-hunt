import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import HomePage from '../app/assets/javascripts/components/homePage.js';
import { expect } from 'chai';
import sinon from 'sinon';
const clock = sinon.useFakeTimers();

describe('HomePage', () => {
  describe('render', () => {
    it('should render a random image', () => {
      const images1 = [];
      for (var i = 0; i < 3; i++) {
        const component = renderIntoDocument(
          <HomePage />
        );

        const src = component.state.background;
        images1.push(src);
      }

      const images2 = [];
      for (var i = 0; i < 3; i++) {
        const component = renderIntoDocument(
          <HomePage />
        );

        const src = component.state.background;
        images2.push(src);
      }

      expect(images1).to.not.eq(images2);
    });
  });
});
