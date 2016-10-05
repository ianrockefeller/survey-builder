import React, {PropTypes} from 'react';

var InputComponent = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.data.qname !== this.props.data.qname;
	},
	render: function() {
		return (
			<div className={'col-'+this.props.data.ncols+' active cell'}>
				<input type='text' 
					name={this.props.inputName} 
					defaultValue={this.props.answer === false ? "" : this.props.answer} />
			</div>
		);
	}
});

export default InputComponent;