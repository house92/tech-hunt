import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Search from '../app/assets/javascripts/components/search.js';
import { expect } from 'chai';

describe('Search', () => {
  describe('render', () => {
    it('should display a text input and two buttons', () => {
      const component = renderIntoDocument(
        <Search />
      );
      const search = scryRenderedDOMComponentsWithTag(component, 'input').filter((input) => {
        return input.getAttribute('name') == 'title';
      });
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(search.length).to.eql(1);
      expect(buttons.length).to.eql(2);
    });
  });

  describe('clicking on advanced search', () => {
    it('should expand advanced options', () => {
      const component = renderIntoDocument(
        <Search />
      );

      const collapseDiv = findRenderedDOMComponentWithClass(component, 'collapse');
      const inputs = collapseDiv.getElementsByTagName('input');

      const advancedSearchButton = scryRenderedDOMComponentsWithTag(component, 'button').filter((button) => { return button.type == 'button' })[0];
      Simulate.click(advancedSearchButton);

      expect(inputs.length).to.eql(7);
      expect(component.state.advancedSearchOpen).to.be.ok;
    });
  });
});
