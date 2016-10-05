import React, {PropTypes} from 'react';

var ErrorText = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return true;
	},
	render: function() {
		console.log('ErrorText rendered'+this.props.error);
		return (
			<div id='errorText' className='survey-row'>  
				<p>{this.props.error}</p>
			</div>
		);
	}
});

export default ErrorText;