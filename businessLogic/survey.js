// Create the JSON object that will be the Survey
// import React from 'react';

var ids = {
	counter: 0,
	make: function() {
		this.counter++;
		return this.counter;
	}
};

export class Question {
	constructor(name, type) {
		this.id = ids.make();
		this.name = name;
		this.type = type ? type.toLowerCase() : 'html';
		this.title = '';
		this.content = '';
		this.comment = '';
		this.suspend = true;
		this.orderByRow = false;	
		this.optional = false;
		this.rows = [];
		this.cols = [];		
	}
}

export class Textbox extends Question {
	constructor(name) {
		super(name, 'textbox');
	}
}

export class Dropdown extends Question {
	constructor(name) {
		super(name,'dropdown');
		this.choices = [];
		this.unique = false;
		this.selectedText = false;
	}
}

export class Radio extends Question {
	constructor(name) {
		super(name,'radio');
		this.unique = false;
	}
}

export class Checkbox extends Question {
	constructor(name) {
		super(name, 'checkbox');
		this.atleast = 1;
	}
}

export class Screen {
	constructor() {
		this.id = ids.make();
		this.questions = [];
		this.delay = 0;		
		this.iterations = 0;
	}
}

export class Survey {
	constructor(name) {
		this.id = ids.make();
		this.name = name;
		this.screens = [];
		this.vars = {};
	}
}

/* TESTING */
var SURVEY = new Survey('iMarketResearch Survey Builder');

SURVEY.vars = {
	cat_1: "Mittens",
	cat_2: "Paul",
	cat_3: "Diane",
	dog_1: "Buddy",
	dog_2: "Minnie",
	dog_3: "Sparky",
	cat_sound: "Meow",
	dog_sound: "Woof"
};

var s1 = new Screen();
var q1 = new Radio('QGender');
q1.rows = ['Male', 'Female'];
q1.cols = ['','Gender'];
q1.title = 'Gender Question';
q1.content = 'Are you male or female?';
q1.comment = 'Please select one';
s1.questions.push(q1);

var s2 = new Screen();
var q2 = new Radio('QHOWSMYDRIVING');
q2.rows = ['Rating'];
q2.cols = ['','1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
q2.title = 'Rating Question';
q2.content = 'Please rate this survey on a scale of 1 to 10';
q2.comment = '1 = Terrible; 10 = Great';
q2.orderByRow = true;
s2.questions.push(q2);

var s3 = new Screen();
var q3 = new Checkbox('QNARCISSISM');
q3.rows = ['Funny', 'Cool', 'Sad', 'Happy', 'Hardworking', 'Independent', 'Psycopath', 'Loser', 'Lazy', 'Bashful', 'Grumpy', 'Sleepy'];
q3.cols = ['','Characteristics'];
q3.title= 'Describe Yourself';
q3.content = 'How would someone describe you?';
q3.comment = 'Pick at least 3';
q3.atleast = 3;
s3.questions.push(q3);

var q4 = new Radio('QSelfEsteem');
q4.rows = ['Yes', 'No'];
q4.cols = ['',''];
q4.title = 'Self-esteem Question';
q4.content = 'Do you like yourself?';
q4.comment = 'Please select one';
s3.questions.push(q4);

var s4 = new Screen();
s4.iterations = 3;
var q5 = new Radio('QShallowRating');
q5.rows = ['This Row is for Looks', 'This Row is for Personality'];
q5.cols = ['','1', '2', '3', '4', '5', '6', '7'];
q5.title = 'Shallow Rating Question';
q5.content = 'Please rate yourself on the two dimensions below';
q5.comment = '7 = HOT; 1 = NOT';
q5.unique = true;
q5.orderByRow = true;
s4.questions.push(q5);

var s5 = new Screen();
s5.iterations = 3;
var q6 = new Checkbox('TwoRowCheckboxQuestion');
q6.rows = ['Steal', 'Get a Job', 'Sell Drugs', 'Prostitution', 'Hitman', 'Rob a Bank'];
q6.cols = ['', 'Good', 'Bad'];
q6.title = 'Rate "Good" or "Bad"';
q6.content = 'Your family is broke and your children are starving. From the list, decide whether each option is good and/or bad morally to provide for your family.';
q6.comment = 'Choose Good, Bad, or both for each option.';
s5.questions.push(q6);

var s6 = new Screen();
var q7 = new Question('QIntro');
s6.delay = 5;
q7.content = { __html: "<div>" +
				"<h2>Welcome to the Survey Builder!</h2> "+
"				<p><i>This is an example screen to show</i> that you can add <b>HTML ANYWHERE</b>!</p>"+
"				<p>This application uses JSX a very powerful JavaScript templating engine!</p>"+
"				<ul>"+
"					<li>You</li>"+
"					<li>Can</li>"+
"					<li>Even</li>"+
"					<li>Make</li>"+
"					<li>Lists!</li>"+
"				</ul>"+
"				<h3>Click 'Next' to continue.</h3>"+
"			</div>"};

s6.questions.push(q7);

var s7 = new Screen();
var q8 = new Dropdown('QDropdownQuestion');
q8.rows = ["Terrifying Terry", "Scary Skeleton", "Freightening Frankenstein", "Spooky Ghoost"];
q8.cols = ["Name", "Dropdown A"];
q8.choices = ["Spooky Ghoost", "Scary Skeleton", "Freightening Frankenstein", "Terrifying Terry"];
q8.title = 'Mystery Dropdown';
q8.content = "Match the names from the dropdowns!";
q8.comment = "Just click on it!";
s7.questions.push(q8);

var q9 = new Textbox('QTextboxTest');
q9.title = 'Textbox Test Question';
q9.content = 'Tell me about yourself..';
q9.comment = 'Just answer the questions';
q9.rows = ["What is your name?", "How old are you?"];
q9.cols = ["","Answers"];
s7.questions.push(q9);

SURVEY.screens.push(s6);
SURVEY.screens.push(s7);
SURVEY.screens.push(s1);
SURVEY.screens.push(s2);
SURVEY.screens.push(s3);
SURVEY.screens.push(s4);
SURVEY.screens.push(s5);

// console.log(JSON.stringify(SURVEY));

export { SURVEY };
