import React, {PropTypes} from 'react';
import ScreenContainer from './ScreenContainer';
import DevContainer from './DevContainer';

var SurveyApp = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		//return nextProps.surveyAppState.screenIndex !== this.props.surveyAppState.screenIndex;
		return true;
	},	
	render: function() {
		console.log('SurveyApp rendered');
		console.log(this.props.surveyAppState);
		return(
			<div>
				<div id="survey">
					<ScreenContainer actions={this.props.actions} surveyAppState={this.props.surveyAppState} />
				</div>
				<div id="dev">
					<DevContainer surveyAppState={this.props.surveyAppState} />
				</div>
			</div>
		);
	}
});

export default SurveyApp;