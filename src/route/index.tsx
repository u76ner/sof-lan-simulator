import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Main from "../pages/Main/Main";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/" component={Main} />
        <Route exact path="/hoge">
          <Redirect to="/" />
        </Route>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Router;
