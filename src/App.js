import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/main.css";

import UserContext from "./UserContext";
import reducer from "./reducer";

//components
import Home from "./components/Home";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Notes from "./components/Notes";

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <Router>
      <div className="unselectable">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/welcome" exact component={Welcome} />
          <UserContext.Provider value={{ state, dispatch }}>
            <ProtectedRoute path="/notes" exact component={Notes} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
