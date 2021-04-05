import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

import List from "./components/list";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/:username/" component={List} />
          <Route exact path="/:username/:bg" component={List} />
          <Route exact path="/:username/:bg/:text" component={List} />
          <Route exact path="/:username/:bg/:text/:button" component={List} />
          {/* <Redirect to="/" component={NoParams} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
