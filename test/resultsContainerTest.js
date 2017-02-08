import React from 'react';
import { Simulate, renderIntoDocument, scryRenderedDOMComponentsWithTag, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import ResultsContainer from '../app/assets/javascripts/components/resultsContainer.js';
import { expect } from 'chai';

describe('ResultsContainer', () => {
  const search = {
    title: "",
    location: "",
    lat: "",
    lng: "",
    grading: "",
    min_salary: "",
    max_salary: "",
    full_time: "" == "true",
    part_time: "" == "true",
    permanent: "" == "true",
    contract: "" == "true",
    offers_visa: "" == "true"
  }

  const job = {
    title: "Web Developer - Full Stack",
    description: "Full Stack Web Developer to join a small and agile team based in London, working on some exciting great global clients.",
    location: "London, UK",
    salary: 40000,
    full_time: true,
    grading: "Mid-level",
    contract: false,
    offers_visa: false
  };

  global.google = {
  	maps: {
  		LatLng: function(lat, lng) {
  			return {
  				latitude: parseFloat(lat),
  				longitude: parseFloat(lng),

  				lat: function() { return this.latitude; },
  				lng: function() { return this.longitude; }
  			};
  		},
  		LatLngBounds: function(ne, sw) {
  			return {
  				getSouthWest: function() { return sw; },
  				getNorthEast: function() { return ne; }
  			};
  		},
  		OverlayView: function() {
  			return {};
  		},
  		InfoWindow: function() {
  			return {};
  		},
  		Marker: function() {
  			return {
          addListener: function() {
            return {};
          }
        };
  		},
  		MarkerImage: function() {
  			return {};
  		},
  		Map: function() {
  			return {};
  		},
  		Point: function() {
  			return {};
  		},
  		Size: function() {
  			return {};
  		}
  	}
  };

  describe('render', () => {
    it('should display provided job results', () => {
      const component = renderIntoDocument(
        <ResultsContainer jobs={[job]} search={search} />
      );

      const container = findRenderedDOMComponentWithClass(component, 'results');
      const title = scryRenderedDOMComponentsWithTag(component, 'h2')[0];
      const description = scryRenderedDOMComponentsWithClass(component, 'description')[0];
      const salary = scryRenderedDOMComponentsWithClass(component, 'salary')[0];

      expect(title.textContent).to.eql(job.title);
      expect(description.textContent).to.eql(job.description);
      expect(parseInt(salary.textContent.substr(1, 99))).to.eql(job.salary);
    });
  });

  describe('entering data', () => {
    it('should update the state', () => {
      const component = renderIntoDocument(
        <ResultsContainer jobs={[job]} search={search} />
      );

      const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
      const title = inputs[0];
      const fullTime = inputs[17];
      const partTime = inputs[18];

      title.value = "developer";
      Simulate.change(title);

      fullTime.checked = true;
      fullTime.dataset = {
        name: "full_time"
      };
      Simulate.change(fullTime);
      partTime.checked = true;
      partTime.dataset = {
        name: "part_time"
      };
      Simulate.change(partTime);

      setTimeout(() => {
        expect(component.state.title).to.eql("developer");
        expect(component.state.full_time).to.eql(true);
        expect(component.state.part_time).to.eql(false);
      }, 1);
    });
  });
});
