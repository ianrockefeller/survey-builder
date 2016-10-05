import React, {PropTypes} from 'react';

var QuestionText = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.data.name !== this.props.data.name;
	},
	render: function() {
		console.log('QuestionText rendered');
		return (
			<div className='questionText header survey-row'>
				<p className="title">{this.props.data.title}</p>
				<p className="content">{this.props.data.content}</p>
				<p className="comment">{this.props.data.comment}</p>
			</div>
		);
	}
});

export default QuestionText;