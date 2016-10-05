import React, {PropTypes} from 'react';
import {Stopwatch} from '../businessLogic/stopwatch';



var DevContainer = React.createClass({	
	shouldComponentUpdate: function(nextProps, nextState) { // Component is about to update, should it?
		if(nextProps.surveyAppState.screenIndex > this.props.surveyAppState.screenIndex) { // it's about to update?!? get the time on screen and reset before moving on!
			document.getElementById('screenTime').innerHTML = '';
			var screenSW = new Stopwatch(document.getElementById('screenTime'), {});
			screenSW.start();				
		}

		return true;
	},
	componentDidMount: function() { // component mounted to DOM, only happens once!
		var surveySW = new Stopwatch(document.getElementById('surveyTime'), {}); // initialize survey timer
		surveySW.start();
		var screenSW = new Stopwatch(document.getElementById('screenTime'), {}); // initialize first screen timer
		screenSW.start();			
	},
	componentDidUpdate: function() { // shouldComponentUpdate let the component update, what should happen?
		var lastClick; // last click time records like iSDT does, e.g. does not start timer until first click!!

		if(document.getElementById('lastClickTime').innerHTML === '') {
			lastClick = new Stopwatch(document.getElementById('lastClickTime'), {});
			lastClick.start();	
		} else {
			document.getElementById('lastClickTime').innerHTML = '';
			lastClick = new Stopwatch(document.getElementById('lastClickTime'), {});
			lastClick.start();				
		}

		
	},
	render: function() {
		return (
			<div id='devContainer' className='survey-row'>  
				<p><b>Dev Container:</b></p>
				<table className="table table-bordered">
					<tbody>
						<tr><td>Survey Running Time</td><td><span id="surveyTime"></span></td></tr>
						<tr><td>Screen Running Time</td><td><span id="screenTime"></span></td></tr>
						<tr><td>Time Since Last Click</td><td><span id="lastClickTime"></span></td></tr>
					</tbody>
				</table>
			</div>
		);
	}
});



export default DevContainer;