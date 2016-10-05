// thank you StackOverflow
function handleFormInputChange(state, e, name, qIndex) { //state = state.answers
  var el = e.target
  var elname = el.name
  var type = el.type

  console.log(type)
  if (type == 'select-one' || type == 'select-multiple') {
    var selectedOptions = []
    for (var i = 0, l = el.options.length; i < l; i++) {
      if (el.options[i].selected) {
        selectedOptions.push(el.options[i].value)
      }
    }

    let colIndex = parseInt(el.name.match(/c\d+/)[0].substr(1))
    let rowIndex = parseInt(el.name.match(/r\d+/)[0].substr(1))

    state.answers[state.screenIndex][name][rowIndex-1][colIndex-1] = selectedOptions[0]

    console.log('select multiple WRITE THIS CODE')
    console.log(state.answers[state.screenIndex][name])
  } else if (type == 'checkbox') {
    let colIndex = parseInt(el.value.match(/c\d+/)[0].substr(1))
    let rowIndex = parseInt(el.value.match(/r\d+/)[0].substr(1))
      
    if(!colIndex || !rowIndex) {
      console.log('column or row index error!')
      return false
    }

    var objType = Object.prototype.toString.call(el.form.elements[elname])
    console.log(objType)
    if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]' || objType == '[object HTMLInputElement]') {
      var checkedBoxes = state.answers[state.screenIndex][name];
      if (el.checked) { // set to true
        checkedBoxes[rowIndex-1][colIndex-1] = true
      }
      else { // set to false
        checkedBoxes[rowIndex-1][colIndex-1] = false
      }
      state.answers[state.screenIndex][name] = checkedBoxes
    }
    else {
      //state.answers[state.screenIndex] = el.checked
      console.log('checkbox end else..')
    }
  }
  else if(type === 'text') {
    let colIndex = parseInt(el.name.match(/c\d+/)[0].substr(1))
    let rowIndex = parseInt(el.name.match(/r\d+/)[0].substr(1))    
    state.answers[state.screenIndex][name][rowIndex-1][colIndex-1] = el.value;
  } else { // radio 
    // make them all false
    let colIndex = parseInt(el.value.match(/c\d+/)[0].substr(1))
    let rowIndex = parseInt(el.value.match(/r\d+/)[0].substr(1))
      
    if(!colIndex || !rowIndex) {
      console.log('column or row index error!')
      return false
    }


    let obr = state.model.screens[state.screenIndex].questions[qIndex].orderByRow // orderByRow = true or false
    let index = obr ? rowIndex : colIndex

    if(obr) {
      console.log('order by row in handle form changes')
      state.answers[state.screenIndex][name][rowIndex-1].forEach(function(col,i) {
        state.answers[state.screenIndex][name][rowIndex-1][i] = false
      })
      
    } else {
      state.answers[state.screenIndex][name].forEach(function(row,i) {
        state.answers[state.screenIndex][name][i][colIndex-1] = false
      })
    }
    // set the answer clicked to true
    state.answers[state.screenIndex][name][rowIndex-1][colIndex-1] = !state.answers[state.screenIndex][name][rowIndex-1][colIndex-1]
    console.log(state.answers[state.screenIndex][name][rowIndex-1])
  }

  return state.answers
}

export default handleFormInputChange