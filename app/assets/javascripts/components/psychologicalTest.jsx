import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup, Button, Radio } from 'react-bootstrap';

const tests = [{name: "Big Five", value: "bigFive"}, {name: "Myers-Briggs", value: "myersBriggs"}];
const scale = ["Strongly Disagree", "Somewhat Disagree", "Neutral", "Somewhat Agree", "Strongly Agree"];

export default class PsychologicalTest extends Component {
  constructor(props) {
    super(props);
    this.state = { test: tests[0].value }
    this.handleTestChange = this.handleTestChange.bind(this);
    this.choices = this.choices.bind(this);
  }

  handleTestChange(e) {
    this.setState({ test: e.target.value})
  }

  choices(question, index) {
    return scale.map((degree, i) => {
      const positive = question.value > 0 ? true : false;
      return <Radio key={`question${index + 1}degree${i + 1}`} name={`question${index + 1}`} value={positive ? i + 1 : 5 - i} data-category={Math.abs(question.value)} inline>{degree}</Radio>
    });
  }

  render() {
    const options = tests.map((test, i) => {
      return <option key={`test${i + 1}`} value={test.value}>{test.name}</option>;
    });

    const bigFiveQuestions = [
      {statement: "Am the life of the party.", value: +1},
      {statement: "Feel little concern for others.", value: -2},
      {statement: "Am always prepared.", value: +3},
      {statement: "Get stressed out easily.", value: -4},
      {statement: "Have a rich vocabulary.", value: +5},
      {statement: "Don't talk a lot.", value: -1},
      {statement: "Am interested in people.", value: +2},
      {statement: "Leave my belongings around.", value: -3},
      {statement: "Am relaxed most of the time.", value: +4},
      {statement: "Have difficulty understanding abstract ideas.", value: -5},
      {statement: "Feel comfortable around people.", value: +1},
      {statement: "Insult people.", value: -2},
      {statement: "Pay attention to details.", value: +3},
      {statement: "Worry about things.", value: -4},
      {statement: "Have a vivid imagination.", value: +5},
      {statement: "Keep in the background.", value: -1},
      {statement: "Sympathize with others' feelings.", value: +2},
      {statement: "Make a mess of things.", value: -3},
      {statement: "Seldom feel blue.", value: +4},
      {statement: "Am not interested in abstract ideas.", value: -5},
      {statement: "Start conversations.", value: +1},
      {statement: "Am not interested in other people's problems.", value: -2},
      {statement: "Get chores done right away.", value: +3},
      {statement: "Am easily disturbed.", value: -4},
      {statement: "Have excellent ideas.", value: +5},
      {statement: "Have little to say.", value: -1},
      {statement: "Have a soft heart.", value: +2},
      {statement: "Often forget to put things back in their proper place.", value: -3},
      {statement: "Get upset easily.", value: -4},
      {statement: "Do not have a good imagination.", value: -5},
      {statement: "Talk to a lot of different people at parties.", value: +1},
      {statement: "Am not really interested in others.", value: -2},
      {statement: "Like order.", value: +3},
      {statement: "Change my mood a lot.", value: -4},
      {statement: "Am quick to understand things.", value: +5},
      {statement: "Don't like to draw attention to myself.", value: -1},
      {statement: "Take time out for others.", value: +2},
      {statement: "Shirk my duties.", value: -3},
      {statement: "Have frequent mood swings.", value: -4},
      {statement: "Use difficult words.", value: +5},
      {statement: "Don't mind being the center of attention.", value: +1},
      {statement: "Feel others' emotions.", value: +2},
      {statement: "Follow a schedule.", value: +3},
      {statement: "Get irritated easily.", value: -4},
      {statement: "Spend time reflecting on things.", value: +5},
      {statement: "Am quiet around strangers.", value: -1},
      {statement: "Make people feel at ease.", value: +2},
      {statement: "Am exacting in my work.", value: +3},
      {statement: "Often feel blue.", value: -4},
      {statement: "Am full of ideas.", value: +5}
    ];

    const myersBriggsQuestions = [
      {statement: "You are almost never late for your appointments", value: +4},
      {statement: "You like to be engaged in an active and fast-paced job", value: 2},
      {statement: "You enjoy having a wide circle of acquaintances", value: +1},
      {statement: "You feel involved when watching TV soaps", value: -3},
      {statement: "You are usually the first to react to a sudden event: the telephone ringing or unexpected question", value: +1},
      {statement: "You feel that the world is founded on compassion", value: -3},
      {statement: "You think that everything in the world is relative", value: -2},
      {statement: "Strict observance of the established rules is likely to prevent attaining a good outcome", value: -2},
      {statement: "It is difficult to get you excited", value: -1},
      {statement: "When making a decision, you rely more on your feelings than on analysis of the situation", value: -3},
      {statement: "You often think about humankind and its destiny", value: -2},
      {statement: "You believe the best decision is one which can be easily changed", value: -2},
      {statement: "You often ponder the root cause of phenomena and things", value: -2},
      {statement: "You prefer to act immediately rather than speculate about various options", value: -4},
      {statement: "You trust reason rather than feelings", value: +3},
      {statement: "You are inclined to rely more on improvisation than on prior planning", value: -4},
      {statement: "You spend your leisure time actively socializing with a group of people, attending parties, shopping, etc.", value: +1},
      {statement: "You usually plan your actions in advance", value: +4},
      {statement: "Your actions are frequently influenced by your emotions", value: -3},
      {statement: "You are a person somewhat reserved and distant in communication", value: -1},
      {statement: "You know how to put every minute of your time to good purpose", value: +4},
      {statement: "You often contemplate the complexity of life", value: -2},
      {statement: "After prolonged socializing you feel you need to get away and be alone", value: -1},
      {statement: "You often do jobs in a hurry", value: -4},
      {statement: "You easily see the general principle behind specific occurrences", value: +3},
      {statement: "You frequently and easily express your feelings and emotions", value: +1},
      {statement: "You find it difficult to speak loudly", value: -1},
      {statement: "You get bored if you have to read theoretical books", value: -2},
      {statement: "You tend to sympathize with other people", value: -3},
      {statement: "You value justice higher than mercy", value: +3},
      {statement: "You rapidly get involved in the social life of a new workplace", value: +1},
      {statement: "The more people you speak to, the better you feel", value: +1},
      {statement: "You tend to rely on your experience rather than on theoretical alternatives", value: +2},
      {statement: "As a rule, you proceed only when you have a clear and detailed plan", value: +4},
      {statement: "You easily empathize with the concerns of other people", value: -3},
      {statement: "Often you prefer to read a book than go to a party", value: -1},
      {statement: "When with a group of people, you enjoy being directly involved and being at the centre of attention", value: +1},
      {statement: "You are more inclined to experiment than to follow familiar approaches", value: -2},
      {statement: "You are strongly touched by the stories about people's troubles", value: -3},
      {statement: "Deadlines seem to you to be of relative rather than absolute importance", value: -4},
      {statement: "You prefer to isolate yourself from outside noises", value: -1},
      {statement: "For you, it is easier to gain knowledge through hands-on experience than from books or manuals", value: +2},
      {statement: "You think that almost everything can be analyzed", value: +3},
      {statement: "For you, no surprises is better than surprises - bad or good ones", value: +4},
      {statement: "You take pleasure in putting things in order", value: +4},
      {statement: "You feel at ease in a crowd", value: +1},
      {statement: "You have good control over your desires and temptations", value: +3},
      {statement: "You easily understand new theoretical principles", value: -2},
      {statement: "You usually place yourself nearer to the side than in the center of the room", value: -1},
      {statement: "When solving a problem you would rather follow a familiar approach than seek a new one", value: +2},
      {statement: "A thirst for adventure is something close to your heart", value: -2},
      {statement: "When considering a situation you pay more attention to the current situation and less to a possible sequence of events", value: -4},
      {statement: "When solving a problem you consider the rational approach to be the best", value: +3},
      {statement: "You find it difficult to talk about your feelings", value: -1},
      {statement: "Your decisions are based more on the feeling of a moment than on the thorough planning", value: -4},
      {statement: "You prefer to spend your leisure time alone or relaxing in a tranquil", value: -1},
      {statement: "You feel more comfortable sticking to conventional ways", value: +2},
      {statement: "You are easily affected by strong emotions", value: -3},
      {statement: "You are always looking for opportunities", value: -2},
      {statement: "As a rule, current preoccupations worry you more than your future plans", value: -4},
      {statement: "It is easy for you to communicate in social situations", value: +1},
      {statement: "You rarely deviate from your habits", value: +2},
      {statement: "You willingly involve yourself in matters which engage your sympathies", value: -3},
      {statement: "You easily perceive various ways in which events could develop", value: +4}
    ]

    var testForm;
    switch (this.state.test) {
      case tests[0].value:
        var inputs = bigFiveQuestions.map((question, i) => {
          return (
            <div key={`key${i + 1}`} className="question">
              <span>{question.statement}</span>
              {this.choices(question, i)}
            </div>
          );
        });
        testForm = (
          <div>
            <h2 className="name">{tests[0].name}</h2>
            //(1) Extraversion, (2) Agreeableness, (3) Conscientiousness, (4) Emotional Stability, or (5) Intellect/Imagination) and its direction of scoring (+ or -)
            <form action="/tests/big_five" method="POST">
              {inputs}
              <Button type="submit">{`Submit`}</Button>
            </form>
          </div>
        );
        break;
      case tests[1].value:
        var inputs = myersBriggsQuestions.map((question, i) => {
          return (
            <div key={`key${i + 1}`} className="question">
              <span>{question.statement}</span>
              {this.choices(question, i)}
            </div>
          );
        });
        testForm = (
          <div>
            <h2 className="name">{tests[1].name}</h2>
            <form action="/tests/myers_briggs" method="POST">
              {inputs}
              <Button type="submit">{`Submit`}</Button>
            </form>
          </div>
        );
        break;
    }

    return (
      <div className="test-container">
        <h1>Personality tests</h1>
        <ControlLabel>{`Please select a test:`}</ControlLabel>
        <FormControl componentClass="select" onChange={this.handleTestChange}>
          {options}
        </FormControl>
        {testForm}
      </div>
    );
  }
}
