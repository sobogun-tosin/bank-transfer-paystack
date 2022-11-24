import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TransferForm from "./components/TransferForm";
import TransferHistory from "./components/TransferHistory";
import Home from "./pages/Home";
import ErrorPage from "./pages/404";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Home />
        <Switch>
          <Route path={"/"} exact component={TransferForm} />
          <Route path={"/transfer_history"} exact component={TransferHistory} />
          <Route path={"*"} component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
