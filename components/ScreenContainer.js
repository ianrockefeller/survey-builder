import React, {PropTypes} from 'react';
import QuestionText from './QuestionText';
import NavContainer from './NavContainer';
import QuestionContainer from './QuestionContainer';
import HTMLComponent from './questionComponents/HTMLComponent';

var ScreenContainer = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return true;
	},
	updateIndex: function(n) {
		this.props.actions.validateAnswer(this.props.surveyAppState, n);		
	},	
	render: function() {
		console.log('ScreenContainer rendered');
		var settings = this.props.surveyAppState;
		var qBody = null;

		if(settings.surveyDone) { // Survey Complete!
			var obj = {
				title: 'Survey Complete!',
				content: 'Thank you for taking our survey.',
				comment: 'You will now be automatically redirected out of the survey.',
				name: 'SURVEY_COMPLETE',
				surveyDone: true
			};
			qBody = <HTMLComponent data={obj} />;
		} else {
			qBody = [];
			settings.model.screens[settings.screenIndex].questions.forEach(function(question, i) {
				if(question.type === 'html') {
					qBody.push(<HTMLComponent key={question.id} data={question} qIndex={i} />);
				} else {
					qBody.push(
						<QuestionContainer key={question.id} answers={settings.answers[settings.screenIndex][question.name]} error={settings.error[question.name]} data={question} actions={this.props.actions} qIndex={i} />			
					);
				}
			}, this);
			qBody.push(<NavContainer key={settings.model.screens[settings.screenIndex].id} updateIndex={this.updateIndex} delay={settings.model.screens[settings.screenIndex].delay} />);
		}

		return (
			<div className='screenContainer'>
				{qBody}
			</div>
		);
	}
});

export default ScreenContainer;