import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Header from '../app/assets/javascripts/components/header.js';
import { expect } from 'chai';
import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// chai.use(sinonChai);
const clock = sinon.useFakeTimers();

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
    it('should show a notice if provided', () => {
      const component = renderIntoDocument(
        <Header notice={"Hello world"} />
      );

      var notice = findRenderedDOMComponentWithClass(component, 'notice');
      expect(notice.textContent).to.eql("Hello world");

      clock.tick(3000);
      notice = findRenderedDOMComponentWithClass(component, 'notice');
      expect(notice.textContent).to.not.eql("Hello world");
    });
    it('should show a alert if provided', () => {
      const component = renderIntoDocument(
        <Header alert={"Hello world"} />
      );

      var alert = findRenderedDOMComponentWithClass(component, 'alert');
      expect(alert.textContent).to.eql("Hello world");

      clock.tick(3000);
      alert = findRenderedDOMComponentWithClass(component, 'alert');
      expect(alert.textContent).to.not.eql("Hello world");
    });
    // it('should show a fixed footer if on the homepage', () => {
    //   window.location.pathname = "/";
    //   const component = renderIntoDocument(
    //     <Header alert={"Hello world"} />
    //   );
    //
    //   const footer = findRenderedDOMComponentWithClass(component, 'navbar-fixed-bottom');
    //   expect(footer).to.be.ok;
    // });
  });

  // describe('clicking on a link', () => {
  //   it('should redirect to the value of the href attribute', () => {
  //     const component = renderIntoDocument(
  //       <Header />
  //     );
  //
  //     const signIn = scryRenderedDOMComponentsWithTag(component, 'a')[1];
  //     Simulate.click(signIn);
  //     expect(window.location.pathname).to.eql(signIn.href);
  //   });
  // });

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
