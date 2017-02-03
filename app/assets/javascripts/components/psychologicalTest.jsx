import React, { Component } from 'react';
import { Row, Col, ControlLabel, FormControl, FormGroup, Button, Radio } from 'react-bootstrap';
import Header from './header.jsx';
import { bigFiveQuestions } from '../../../../lib/bigFiveQuestions.js';
import { myersBriggsQuestions } from '../../../../lib/myersBriggsQuestions.js';

const tests = [{name: "Big Five", value: "bigFive"}, {name: "Myers-Briggs", value: "myersBriggs"}];
const scale = ["Strongly Disagree", "Somewhat Disagree", "Neutral", "Somewhat Agree", "Strongly Agree"];

export default class PsychologicalTest extends Component {
  constructor(props) {
    super(props);
    this.state = { test: tests[0].value }
    this.handleTestChange = this.handleTestChange.bind(this);
    this.buildChoices = this.buildChoices.bind(this);
    this.buildInputs = this.buildInputs.bind(this);
  }

  handleTestChange(e) {
    this.setState({ test: e.target.value})
  }

  buildChoices(question, index) {
    return scale.map((degree, i) => {
      const positive = question.value > 0 ? true : false;
      return (
        <Col className="text-center" xs={2} xsOffset={1} md={1} mdOffset={0} key={`question${index + 1}degree${i + 1}`}>
          <Radio name={`question${index + 1}`} value={positive ? 1 + i : this.state.test == tests[0].value ? 5 - i : -1 - i } data-category={Math.abs(question.value)} inline></Radio>
        </Col>
      );
    });
  }

  buildInputs(questions) {
    return questions.map((question, i) => {
      return (
        <div key={`key${i + 1}`} className="question">
          <Row>
            <Col xs={12} md={3}>
              <span>{question.statement}</span>
              <input type="hidden" name={`question${i + 1}_category`} value={Math.abs(question.value)} />
            </Col>
            {this.buildChoices(question, i)}
          </Row>
        </div>
      );
    });
  }

  render() {
    const options = tests.map((test, i) => {
      return <option key={`test${i + 1}`} value={test.value}>{test.name}</option>;
    });

    const scaleDisplay = scale.map((degree, i) => {
      return (
        <Col className="text-center" md={1} key={`degree${i + 1}`}>
          <span><em>{degree}</em></span>
        </Col>
      );
    });

    var testForm;
    switch (this.state.test) {
      case tests[0].value:
        var inputs = this.buildInputs(bigFiveQuestions);
        //(1) Extraversion, (2) Agreeableness, (3) Conscientiousness, (4) Emotional Stability, or (5) Intellect/Imagination) and its direction of scoring (+ or -)
        testForm = (
          <div>
            <h2 className="name">{tests[0].name}</h2>
            <form action={`/users/${this.props.currentUser.id}/tests/big_five`} method="POST">
              <Row>
                <Col md={3} mdOffset={0}>

                </Col>
                {scaleDisplay}
              </Row>
              {inputs}
              <Button type="submit">{`Submit`}</Button>
            </form>
          </div>
        );
        break;
      case tests[1].value:
        var inputs = this.buildInputs(myersBriggsQuestions);
        testForm = (
          <div>
            <h2 className="name">{tests[1].name}</h2>
            <form action={`/users/${this.props.currentUser.id}/tests/myers_briggs`} method="POST">
              <Row>
                <Col md={3} mdOffset={0}>

                </Col>
                {scaleDisplay}
              </Row>
              {inputs}
              <Button type="submit">{`Submit`}</Button>
            </form>
          </div>
        );
        break;
    }

    return (
      <Header currentUser={this.props.currentUser} notice={this.props.notice} alert={this.props.alert}>
        <div className="test-container">
          <h1>{`Personality tests`}</h1>
          <Row>
            <Col xs={12} md={2}>
              <ControlLabel>{`Please select a test:`}</ControlLabel>
              <FormControl componentClass="select" name="test_selection" onChange={this.handleTestChange}>
                {options}
              </FormControl>
            </Col>
          </Row>
          {testForm}
        </div>
      </Header>
    );
  }
}
