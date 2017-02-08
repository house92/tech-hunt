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

      const container = findRenderedDOMComponentWithClass(component, 'form');
      const search = scryRenderedDOMComponentsWithTag(component, 'input').filter((input) => {
        return input.getAttribute('name') == 'title';
      });
      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      expect(container).to.be.ok;
      expect(search.length).to.eql(2); // includes hidden input for title
      expect(buttons.length).to.eql(2);
    });

    it('should not display collapsed options', () => {
      const component = renderIntoDocument(
        <Search />
      );

      expect(component.state.advancedSearchOpen).to.not.be.ok;
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
    it('should collapse advanced options', () => {
      const component = renderIntoDocument(
        <Search />
      );

      const collapseDiv = findRenderedDOMComponentWithClass(component, 'collapse');
      const inputs = collapseDiv.getElementsByTagName('input');

      const advancedSearchButton = scryRenderedDOMComponentsWithTag(component, 'button').filter((button) => { return button.type == 'button' })[0];
      Simulate.click(advancedSearchButton);
      Simulate.click(advancedSearchButton);

      expect(inputs.length).to.eql(7);
      expect(component.state.advancedSearchOpen).to.not.be.ok;
    });
  });

  describe('entering data', () => {
    it('should update the state', () => {
      const component = renderIntoDocument(
        <Search />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const title = inputs[0];
      const fullTime = inputs[17];
      const partTime = inputs[18];

      title.value = "developer";
      Simulate.change(title);
      Simulate.change(fullTime, {target: {checked: true, dataset: {name: 'full_time'}}});
      Simulate.change(partTime, {target: {checked: true, dataset: {name: 'part_time'}}});

      expect(component.state.title).to.eql("developer");
      expect(component.state.full_time).to.eql(true);
      expect(component.state.part_time).to.eql(false);
    });
  });
});
