import React, {PropTypes} from 'react';
import QuestionText from './QuestionText';
import AnswerContainer from './AnswerContainer';
import ErrorText from './ErrorText';

var QuestionContainer = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		// return nextProps.key !== this.props.key;
		return true;
	},
	render: function() {
		console.log('QuestionContainer rendered');
		let qc = null;

		if(this.props.data.type !== 'html') {
			qc = <div> 
					<QuestionText data={this.props.data} />
					<ErrorText error={this.props.error} />
					<AnswerContainer actions={this.props.actions} data={this.props.data} qIndex={this.props.qIndex} answers={this.props.answers} />
				</div>;
		} else {
			qc = <div>
					<QuestionText data={this.props.data} />
				</div>;
		}

		return (
			<div className='questionContainer'>
				{qc}
			</div>	
		);
	}
});

export default QuestionContainer;