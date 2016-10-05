import React, {PropTypes} from 'react';
import CellComponent from './questionComponents/CellComponent';
import InputComponent from './questionComponents/InputComponent';

var AnswerRow = React.createClass({
	render: function() {
		console.log('AnswerRow rendered');
		var cells = [];
		var row = this.props.row;
		var ncols = 0;

		if(row.length > 12) {
			ncols = 1;
		} else {
			ncols = 12 / row.length;
		}

		for(var i = 0; i < row.length; i++) {
			var cell = row[i];

			if(cell.type == 'header' || cell.type == 'blank') {
				cells.push(<CellComponent key={'cell'+i} cell={cell} ncols={ncols} />);
			} else if(cell.type == 'radio' || cell.type == 'checkbox') {
				cells.push(<InputComponent key={'cell'+i} cell={cell} ncols={ncols} />);
			} else {
				console.log('ERROR: unrecognized cell type!');
			}
		}

		return (
			<div className='row'>
				{cells}
			</div>
		);
	}
});

export default AnswerRow;