import {UPDATE_ANSWER, VALIDATE_ANSWER, INITIALIZE_QUESTION_DATA} from '../constants/ActionTypes'

export function updateAnswer(e, name, qIndex) { //settings = this.props pass
	return { type: UPDATE_ANSWER, e, name, qIndex };
}

export function validateAnswer(settings, n) {
	return { type: VALIDATE_ANSWER, settings, n};
}

export function initializeQuestionData(settings) {
	return { type: INITIALIZE_QUESTION_DATA, settings };
}