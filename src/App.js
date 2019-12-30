import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ResponsiveDrawer from './layout/ResponsiveDrawer';
import useStyles from './layout/styles';
import ListOfPokemons from './pages/ListOfPokemons';
import MyPokemons from './pages/MyPokemons';
import Details from './pages/Details';

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <ResponsiveDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/">
              <ListOfPokemons />
            </Route>
            <Route exact path="/mypokemons">
              <MyPokemons/>
            </Route>
            <Route exact path="/detail/:name">
              <Details/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
