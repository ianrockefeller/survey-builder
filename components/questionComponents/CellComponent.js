import React, {PropTypes} from 'react';

var CellComponent = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.text !== this.props.text;
	},	
	render: function() {
		// console.log('cellcomponent rendered');
		let cell = null;

		if(this.props.text === '') {
			cell = <div className={'col-'+this.props.ncols+' empty'}>{this.props.text}</div>;
		} else if(this.props.isColHeader === 1) {
			cell = <div className={'col-'+this.props.ncols+' inactive cell colHeader'}>{this.props.text}</div>;
		} else {
			cell = <div className={'col-'+this.props.ncols+' inactive cell'}>{this.props.text}</div>;	
		}

		return cell;
	}
});

export default CellComponent;