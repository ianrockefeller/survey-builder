import {UPDATE_ANSWER, VALIDATE_ANSWER, INITIALIZE_QUESTION_DATA} from '../actions/surveyActions';
import formHandler from '../businessLogic/handleFormInputChange';
import formValidator from '../businessLogic/handleFormValidation';
import {SURVEY} from '../all.js';

let setAnswers = function() {
	//console.log('setAnswers');
	let answers = [];

	SURVEY.screens.forEach(function(screen, i) {
		let screenAnswers = {};
		screen.questions.forEach(function(question, j) {
			let cells = [];

			if(question.rows && question.cols) {
				for(let x = 0; x < question.rows.length; x++) {
					cells.push([]);
					for(let y  = 0; y < question.cols.length - 1; y++) {
						cells[x].push(false);
					}
				}				
			}
			screenAnswers[question.name] = cells;

		});
		answers.push(screenAnswers); 		
	});

	return answers;
};

const initialState = {
	screenIndex: 0,
	surveyDone: false,
	error: [],
	model: SURVEY, // change this so it's just the current question data
	answers: setAnswers(), // change this so its not just a piece of shit
	dev: {}
};


//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.

//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function surveyAppState(state = initialState, action) {

// this commented out code is similar to setAnswers() set in initialState 
// but possibly a 'better'/more correct way of doing it
// also tried calling in App Component on willComponent Update
// however, DOM is being re-render after the call, possibly just because of dev mode
/*	if(!state.hydrate) {
		console.log(state.hydrate);
		return Object.assign({}, state, {
			answers: setAnswers(),
			hydrate: true
		});
	}*/

	switch (action.type) {
		case 'VALIDATE_ANSWER': {
			let newValidateState = Object.assign({}, state, {});
			let newScreenIndex = newValidateState.screenIndex + action.n;
			let screenIsValid = true;
			newValidateState.error = [];

			if(newScreenIndex < 0) {
				return newValidateState;
			}

			newValidateState.model.screens[newValidateState.screenIndex].questions.forEach(function(question) {
				let qIsValid = false;

				switch(action.n) {
					case 1: {
						if(question.optional === true) {
							qIsValid = true;
						} else {
							qIsValid = formValidator(state.answers[state.screenIndex][question.name], question.type, question.orderByRow);
							// qIsValid = true;
						}
						break;
					} case -1:
						qIsValid = true; // let the respondent go back

						// if they go back, re-fill answer values!!!

						break;
					default: {
						console.log('ERROR: Unrecognized parameter sent to validateAnswer()');
						return state;
					}
				}

				newValidateState.error[question.name] = [];
				if(!qIsValid) {
					newValidateState.error[question.name].push('There is an error in question ' + question.name + ', find it.');
				} 

				screenIsValid = screenIsValid && qIsValid;
			});

			//console.log(newValidateState.error);
				
			if(screenIsValid) { // if there's no error on the screen
				newValidateState.error = [];
				if(newScreenIndex < newValidateState.model.screens.length && newScreenIndex >= 0) {
					newValidateState.screenIndex = newScreenIndex;	
				} else {
					newValidateState.surveyDone = true;					
				}
			} 

			return newValidateState;
		} case 'UPDATE_ANSWER': {
			var newUpdateState = Object.assign({}, state, {
				answers: formHandler(state, action.e, action.name, action.qIndex)
			});
			
			return newUpdateState;

		} case 'INITIALIZE_QUESTION_DATA': {// init WHOLE survey
			console.log('INITIALIZE QUESTION DATA');
			var newInitState = Object.assign({}, state, {});
			let questions = newInitState.model.questions;

			questions.forEach(function(question) {
				question.cells.forEach(function(cell) {
					let key = question.name+'_c'+cell.col;

					// set all inputs to false, mark them true/false as you go by updating on each click event
					if(cell.type != 'header' && cell.type != 'blank') { // don't count headers
						if(key in newInitState.answers) { 
							newInitState.answers[key].push(false);
						} else {
							newInitState.answers[key] = [false];
						}	
					}	
				});
			});

			return newInitState;

		} default: {
			return state;
		}
	}
}
