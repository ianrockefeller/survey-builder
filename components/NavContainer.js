import React, {PropTypes} from 'react';

var NavContainer = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		// their functionality and design 'should' never change
		//return false; // their function is completely static right?
		return true;
	},
	componentDidMount: function() {
		let d = this.props.delay;
		if(d > 0) {
			$('#nextButton').attr('disabled', true);
			setTimeout(function() {
				$('#nextButton').removeAttr('disabled');
			}, d * 1000);
		}
	},
	incIndex: function() {
		this.props.updateIndex(1);
	},	
	decIndex: function() {
		this.props.updateIndex(-1);
	},	
	render: function() {
		console.log('NavContainer rendered');
		return (
			<div id='navContainer' className='survey-row'>  
				<div className='col-3'>&nbsp;</div>  
				<div className='col-3'>&nbsp;</div>  
				<div className='col-3 survey-row nav-buttons'>  		
					<button type="button" className='btn btn-default' id='backButton' onClick={this.decIndex}><b>&lt;&lt; Back</b></button>
					<button type="button" className='btn btn-default' id='nextButton' onClick={this.incIndex}><b>Next &gt;&gt;</b></button>
				</div>
			</div>
		);
	}
});

export default NavContainer;
