import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TransferForm from "./components/TransferForm/TransferForm";
import Transaction from "./components/TransferForm";
import Home from "./pages/Home";
import ErrorPage from "./pages/404";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Home />
        <Switch>
          <Route path={"/transfer"} exact component={TransferForm} />
          <Route path={"/transfer_history"} exact component={Transaction} />
          <Route path={"*"} component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
