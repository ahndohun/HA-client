import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Home, Users, UserDetail, Board } from "../pages";

class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/users/:id/todos" component={UserDetail} />
          <Route path="/users/:id" component={UserDetail} />
          <Route path="/users" component={Users} />
        </Switch>
        <Route path="/board" component={Board} />
      </div>
    );
  }
}

export default App;
