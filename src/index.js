import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Detail from './components/Detail';
import {
  browserHistory, Router, Route, IndexRoute
} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

// Render the main component into the dom
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path=":id" component={Detail}/>
    <Route path="*" component={NotFound}/>
  </Router>
  , document.getElementById('app'));
