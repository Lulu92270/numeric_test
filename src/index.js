import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import MovieShow from './MovieShow';
import './styles/Root.scss';

const Index = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/movie/:id" component={MovieShow}/>
      </Switch>
    {/* <Footer grPrt={grandParent} user={loggedInStatus.user}/> */}
  </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
