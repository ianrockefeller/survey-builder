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
