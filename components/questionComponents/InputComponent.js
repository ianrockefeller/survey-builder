import React, {PropTypes} from 'react';

var InputComponent = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		return nextProps.data.qname !== this.props.data.qname;
	},
	render: function() {
		// console.log('inputcomponent rendered');
		return (
			<div className={'col-'+this.props.data.ncols+' active cell'}>
				<input type={this.props.data.type} 
					name={this.props.inputName} 
					value={this.props.data.qname+'_r'+this.props.data.row+'_c'+this.props.data.col}
					defaultChecked={this.props.answer} />
			</div>
		);
	}
});

export default InputComponent;