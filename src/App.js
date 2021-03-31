import React, { Component } from 'react';

import './App.css';
import TagsList from './TagList'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Preview from './Preview'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: "/"
    }
  }

  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">

          <Switch>
            {<Route exact path="/" render={() => (<Redirect to="/taglist" />)} />}
            <Route exact path='/taglist' component={TagsList} />
            <Route exact path='/output' component={Preview} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
