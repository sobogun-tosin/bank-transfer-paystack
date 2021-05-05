import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Transaction from "./pages/Transaction";
import Transfer from "./pages/Transfer";
import Test from "./pages/Test";
import TransferHome from "./components/TransferHome";
import TransferForm from "./components/TransferForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Transaction />
        <Switch>
          <Route path={"/transfer"} component={Transfer} exact />
          <Route path={"/transferHome"} component={TransferHome} />
          <Route path={"/transferForm"} component={TransferForm} />
          <Route path={"/test"} component={Test} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
