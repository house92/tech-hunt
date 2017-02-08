import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import Registration from '../app/assets/javascripts/components/registration.js';
import { expect } from 'chai';
// import sinon from 'sinon';
import jsdom from 'jsdom';
// import _$ from 'jquery';
//
// global.jsdom = jsdom.jsdom;
// global.document = global.jsdom('<!doctype html><html><body></body></html>');
// global.window = global.document.defaultView;
// global.XMLHttpRequest = global.window.XMLHttpRequest;
// global.navigator = window.navigator;
//
// global.sinon = require('sinon');
// global.sinon.useFakeXMLHttpRequest();
//
// global.window.XMLHttpRequest = global.XMLHttpRequest;
// global.$ = _$(global.window);

describe('Registration', () => {
  // var server;
  //
  // beforeEach(() => {
  //   server = sinon.fakeServer.create();
  // });
  // afterEach(() => {
  //   server.restore();
  // });
  //
  // describe('render', () => {
  //   it('should display a login form', () => {
  //     const component = renderIntoDocument(
  //       <Registration />
  //     );
  //
  //     const form = findRenderedDOMComponentWithTag(component, 'form');
  //     expect(form).to.be.ok;
  //   });
  // });

  describe('entering text', () => {
    it('should update the state when text is entered', () => {
      const component = renderIntoDocument(
        <Registration />
      );

      const email = scryRenderedDOMComponentsWithTag(component, 'input')[0];
      email.value = 'tony@stark.com';
      Simulate.change(email);

      const password = scryRenderedDOMComponentsWithTag(component, 'input')[1];
      password.value = 'pepper';
      Simulate.change(password);

      expect(component.state.email).to.eql('tony@stark.com')
      expect(component.state.password).to.eql('pepper')
    });
  });

  describe('selecting a hunter account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      expect(inputs.length).to.eql(7);
      expect(inputs[inputs.length - 1].getAttribute('name')).to.eql('last_name');
    });
  });

  describe('selecting an employer account', () => {
    it('should show the appropriate fields', () => {
      const component = renderIntoDocument(
        <Registration />
      );
      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const fields = scryRenderedDOMComponentsWithClass(component, 'field');
      const employerRadio = inputs[inputs.length - 3];
      Simulate.change(employerRadio, {target: {name: 'account_type', value: 'employer'}});

      expect(inputs.length).to.eql(6);
      expect(inputs[inputs.length - 1].getAttribute('name')).to.eql('companyName');
    });
  });

  // describe('submitting the form', () => {
  //   it('should be called', () => {
  //     const component = renderIntoDocument(
  //       <Registration />
  //     );
  //
  //     var callback = sinon.spy();
  //     component._handleRegistrationClick(callback);
  //
  //     // This is part of the FakeXMLHttpRequest API
  //     server.requests[0].respond(
  //         200,
  //         { "Content-Type": "application/json" },
  //         JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
  //     );
  //
  //     assert(callback.calledOnce);
  //
  //     // var post = sinon.stub($, 'ajax');
  //     // post.yields();
  //     //
  //     // const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
  //     //
  //     // const email = inputs[0];
  //     // email.value = 'tony@stark.com';
  //     // Simulate.change(email);
  //     //
  //     // const password = inputs[1];
  //     // password.value = 'pepper';
  //     // Simulate.change(password);
  //     //
  //     // const fields = scryRenderedDOMComponentsWithClass(component, 'field');
  //     // const employerRadio = fields[fields.length - 3].getElementsByTagName('input')[1];
  //     // Simulate.click(employerRadio);
  //     //
  //     // const companyName = inputs[4];
  //     // companyName.value = 'Stark Industries';
  //     // Simulate.change(companyName);
  //     //
  //     // const signUp = scryRenderedDOMComponentsWithTag(component, 'button')[1];
  //     // Simulate.click(signUp);
  //     //
  //     // expect($.ajax.callCount()).to.eql(1);
  //   });
  // });
});
