import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Search from '../app/assets/javascripts/components/search.jsx';
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

      expect(inputs.length).to.eql(8);
    });
  });
});
