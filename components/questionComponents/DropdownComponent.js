import React, {PropTypes} from 'react';

var InputComponent = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.data.qname !== this.props.data.qname;
	},
	render: function() {
		console.log('dropdowncomponent rendered');
		var options = [];
		var val = this.props.answer ? this.props.answer : 'selected';

		options.push(<option key={this.props.inputName+"_choice0"} value="selected">Select an item...</option>);

		this.props.data.choices.forEach(function(choice, i) {
			i += 1
			options.push(<option key={this.props.inputName+"_choice"+i} value={choice}>{choice}</option>);
		}, this);
		return (
			<div className={'col-'+this.props.data.ncols+' active cell'}>
				<select name={this.props.inputName} defaultValue={val}>
					{options}
				</select>
			</div>
		);
	}
});

export default InputComponent;