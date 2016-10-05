function invertTable(a) {
	let w = a.length ? a.length : 0;
	let h = a[0] instanceof Array ? a[0].length : 0;
	let i, j, t = [];

	for(i = 0; i < h; i++) {
		t[i] = [];

		for(j = 0; j < w; j++) {
			t[i][j] = a[j][i];
		}
	}
	return t;
}

function handleFormValidation(answer, type, obr) {
	let isValid = true;
	let errors = [];

	console.log('in handleFormValidation()');

	if(!obr) {
		answer = invertTable(answer);
	} 

	console.log(answer);

	if(type === 'dropdown') {
		answer.forEach(function(ans, i) {
			let isRowValid = true;

			ans.forEach(function(a, j) {
				isRowValid = isRowValid && a;
			});
			
			console.log(isRowValid);
			
			isValid = isValid && isRowValid;
		});	
	} else if(type === 'textbox') {
		answer.forEach(function(ans, i) {
			let isRowValid = true;

			ans.forEach(function(a, j) {
				if(a === false) {
					a = false;
				} else if(a.trim() === '') {
					a = false;
				} else {
					a = true;
				}
				isRowValid = isRowValid && a;
			});
			
			console.log(isRowValid);
			
			isValid = isValid && isRowValid;
		});			
	} else {
		answer.forEach(function(ans, i) {
			let isRowValid = false;

			ans.forEach(function(a, j) {
				isRowValid = isRowValid || a;
			});
			
			console.log(isRowValid);
			
			isValid = isValid && isRowValid;
		});		
	}

	return isValid;
}

export default handleFormValidation;