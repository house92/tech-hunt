import React, { Component } from 'react';
import * as d3 from 'd3';
import RadarChart from '../../../../lib/radarChart.js';

export default class PsychologicalChart extends Component {
  constructor(props) {
    super(props);
    this.bigFive = this.bigFive.bind(this);
  }

  componentDidMount() {
    switch (this.props.test) {
      case 'Big Five':
        this.bigFive(this.props.data);
        break;
      case 'Myers-Briggs':
        console.log("Myers-Briggs!!!");
        break;
    }
  }

  bigFive(userData) {
    //////////////////////////////////////////////////////////////
    //////////////////////// Set-Up //////////////////////////////
    //////////////////////////////////////////////////////////////

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
      height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////

    var data = [
          [
          {axis:"Openness",value:userData.openness},
          {axis:"Conscientiousness",value:userData.conscientiousness},
          {axis:"Extraversion",value:userData.extraversion},
          {axis:"Agreeableness",value:userData.agreeableness},
          {axis:"Emotional stability",value:userData.stability}
          ]
        ];
    //////////////////////////////////////////////////////////////
    //////////////////// Draw the Chart //////////////////////////
    //////////////////////////////////////////////////////////////

    var color = d3.scaleOrdinal()
      .range(["#EDC951","#CC333F","#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1.0,
      levels: 5,
      roundStrokes: true,
      color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", data, radarChartOptions);
  }

  render() {
    return (
      <div className="chart">
        <h2 className="name">{this.props.test}</h2>
        <div className="radarChart"></div>
      </div>
    );
  }
}
