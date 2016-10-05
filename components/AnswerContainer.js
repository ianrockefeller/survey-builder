import React, {PropTypes} from 'react';
import {Cell} from '../businessLogic/survey';
import CellComponent from './questionComponents/CellComponent';
import InputComponent from './questionComponents/InputComponent';
import DropdownComponent from './questionComponents/DropdownComponent';
import TextboxComponent from './questionComponents/TextboxComponent';

var AnswerContainer = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		// return this.props.data.id !== nextProps.data.id;
		return true;
	},
	onFormUpdate: function(e) {
		console.log('form has been changed');
		this.props.actions.updateAnswer(e, this.props.data.name, this.props.qIndex);
	},
	render: function() {
		console.log('AnswerContainer rendered');
		var question = this.props.data;
		var qRows = question.rows;
		var qCols = question.cols;
		var cells = [];
		var ncols = 0;

		if(qCols.length > 12) {
			ncols = 12;
		} else {
			ncols = qCols.length;
		}		

		var row = [];
		var i, j;
		var key = '';
		var cellCount = 1;

		for(i = 0; i < qCols.length; i++) {
			key = question.name + '_cell_' + cellCount;
			cellCount++;
			row.push(<CellComponent key={key} text={qCols[i]} ncols={ncols} isColHeader={1} />);
		}
		cells.push(row);

		for(i = 0; i < qRows.length; i++) {
			row = [];
			var data = {};
			key = question.name + '_cell_' + cellCount;
			cellCount++;
			row.push(<CellComponent key={key} text={qRows[i]} ncols={ncols} isColHeader={0} />);

			for(j = 0; j < qCols.length - 1; j++) {
				data = {
					type: this.props.data.type,
					row: i+1,
					col: j+1,
					ncols: ncols,
					qname: question.name
				};
				key = question.name + '_' + data.row + '_' + data.col;
				var inputName = question.orderByRow ? question.name +'_r'+data.row+'_c'+data.col : question.name+'_c'+data.col+'_r'+data.row;

				switch(this.props.data.type) {
					case 'radio':
					case 'checkbox': {
						row.push(<InputComponent key={key} data={data} inputName={inputName} answer={this.props.answers[i][j]} />);
						break;
					}  case 'dropdown': {
						data.choices = this.props.data.choices;
						//data.selectedText = this.props.data.selectedText;
						row.push(<DropdownComponent key={key} data={data} inputName={inputName} answer={this.props.answers[i][j]} />)
						break;
					} case 'textbox': {
						row.push(<TextboxComponent key={key} data={data} inputName={inputName} answer={this.props.answers[i][j]} />);
						break;
					}
				}

				
			}
			cells.push(row);
		}

		return(
			<div className='survey-row answerContainer'>
				<form onChange={this.onFormUpdate} name={question.name}>
					{cells.map(function(row,i) {
						return (
							<div key={question.name+'_r'+(i+1)} className="survey-row">
								{row}
							</div>
						);
					})}
				</form>
			</div>
		);
	}
});

export default AnswerContainer;