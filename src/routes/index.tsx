import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import Simulator from "pages/Simulator/Simulator";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/simulator" component={Simulator} />
        <Route exact path="/">
          <Redirect to="/simulator" />
        </Route>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
