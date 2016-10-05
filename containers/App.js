// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SurveyApp from '../components/SurveyApp';
import * as SurveyActions from '../actions/surveyActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    //this.props.actions.initializeQuestionData(this.props.surveyAppState);
  }

  render() {
    //console.log('testing App');
    const { surveyAppState, actions } = this.props;
    return (
        <SurveyApp surveyAppState={surveyAppState} actions={actions} />
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  surveyAppState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    surveyAppState: state.surveyAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SurveyActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
