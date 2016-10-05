import React, {PropTypes} from 'react';

var HTMLComponent = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.data.name !== this.props.data.name;
	},
	componentDidMount: function() {
		if(this.props.data.surveyDone) {
			setTimeout(function() { window.location.href= "//imarketresearch.com" }, 3000);
		}
	},
	render: function() {
		return (
			<div className='htmlComponent header survey-row'>
				<div className="content" dangerouslySetInnerHTML={this.props.data.content}></div>
			</div>
		);
	}
});

export default HTMLComponent; 