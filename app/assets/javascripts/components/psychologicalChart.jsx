import React, { Component } from 'react';
import * as d3 from 'd3';
import RadarChart from '../../../../lib/radarChart.js';

export default class PsychologicalChart extends Component {
  constructor(props) {
    super(props);
    this.bigFive = this.bigFive.bind(this);
    this.myersBriggs = this.myersBriggs.bind(this);
  }

  componentDidMount() {
    switch (this.props.test.name) {
      case 'Big Five':
        this.bigFive(this.props.data);
        break;
      case 'Myers-Briggs':
        this.myersBriggs(this.props.data);
        break;
    }
  }

  bigFive(userData) {
    //////////////////////////////////////////////////////////////
    //////////////////////// Set-Up //////////////////////////////
    //////////////////////////////////////////////////////////////

    var margin,
        width,
        height;
    if (document.getElementById(`test${this.props.test.id}`)) {
      margin = {top: 80, right: 80, bottom: 80, left: 80},
      width = Math.max(300, document.getElementById(`test${this.props.test.id}`).parentElement.offsetWidth / 2),
      height = Math.min(width, window.innerHeight * 0.5 - margin.top - margin.bottom - 20);
    } else {
      margin = {top: 80, right: 80, bottom: 80, left: 80},
      width = Math.max(300, 369 / 2),
      height = Math.min(width, window.innerHeight * 0.5 - margin.top - margin.bottom - 20);
    }

    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////

    var data = [
          [
          {axis:"Openness",value:userData.openness / 50},
          {axis:"Conscientiousness",value:userData.conscientiousness / 50},
          {axis:"Extraversion",value:userData.extraversion / 50},
          {axis:"Agreeableness",value:userData.agreeableness / 50},
          {axis:"Emotional stability",value:userData.stability / 50}
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
    RadarChart(`#test${this.props.test.id}`, data, radarChartOptions);
  }

  myersBriggs(userData) {
    var margin,
        width,
        height;
    if (document.getElementById(`test${this.props.test.id}`)) {
      margin = {top: 20, right: 30, bottom: 40, left: 30},
      width = document.getElementById(`test${this.props.test.id}`).parentElement.offsetWidth * 0.635,
      height = document.getElementById(`test${this.props.test.id}`).parentElement.offsetWidth * 0.4;
    } else {
      margin = {top: 20, right: 30, bottom: 40, left: 30},
      width = 369 * 0.635,
      height = 369 * 0.4;
    }

    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleBand()
        .rangeRound([0, height], 0.1);

    var xAxis = d3.axisBottom()
        .scale(x)

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(0)
        .tickPadding(6);

    var svg = d3.select(`#test${this.props.test.id}`).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tsvArray = Object.keys(userData).filter((key) => { return key == "first" || key == "second" || key == "third" || key == "fourth" }).map((key) => { return [JSON.parse(userData[key]).name, JSON.parse(userData[key]).value] });
    var tsvData =  [["name", "value"]].concat(tsvArray).map((array) => { return array.join('\t') }).join('\n');

    var data = d3.tsvParse(tsvData);
    x.domain([-100, 100]).nice();
    y.domain(data.map(function(d) { return d.name; }));

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
        .attr("x", function(d) { return x(Math.min(0, d.value)); })
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis);

    function type(d) {
      d.value = +d.value;
      return d;
    }

    //Container for the gradients
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
    	.attr("id","glow");
    filter.append("feGaussianBlur")
    	.attr("stdDeviation","3.5")
    	.attr("result","coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
    	.attr("in","coloredBlur");
    feMerge.append("feMergeNode")
    	.attr("in","SourceGraphic");

    //Apply to your element(s)
    d3.selectAll(".bar")
    	.style("filter", "url(#glow)");

    if (document.getElementById(`test${this.props.test.id}`)) {
      const personalityType = Object.keys(userData).map((key) => { return userData[key].name }).join('');
      const typeDiv = document.createElement('div');
      typeDiv.className = "personality-type";
      typeDiv.innerHTML = personalityType;
      document.getElementById(`test${this.props.test.id}`).parentElement.appendChild(typeDiv);
      document.getElementById(`test${this.props.test.id}`).style.marginTop = '6rem';
    }

  }

  render() {
    return (
      <div className="chart-container">
        <h3 className="name">{this.props.test.name}</h3>
        <div id={`test${this.props.test.id}`} className={`chart`}></div>
      </div>
    );
  }
}
