import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import Search from '../app/assets/javascripts/components/search.jsx';
import { expect } from 'chai';

describe('Search', () => {
  describe('render', () => {
    it('should display a text input and button', () => {
      const component = renderIntoDocument(
        <Search />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(inputs.length).to.eql(1);
      expect(buttons.length).to.eql(1);
    });
  });
});
