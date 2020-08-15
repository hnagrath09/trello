import React from "react";
// import Board from "./components/Board";
import Auth from "./components/Auth";
import AuthScene from "./pages/Auth";
import { Switch, BrowserRouter } from "react-router-dom";
import Route from "./components/Route";
import Home from "./pages/Home";
import Board from "./components/Board";

const App = () => {
  return (
    <Auth>
      <BrowserRouter>
        <Switch>
          <Route
            path={["/login", "/signup", "/reset-password"]}
            component={AuthScene}
          />
          <Route path="/" exact protectedRoute component={Home} />
          <Route
            path="/:boardId"
            protectedRoute
            render={(props) => {
              return <Board {...props} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </Auth>
    // <div className="w-screen h-screen bg-blue-600 ">
    //   <Navbar />
    //   <Board />
    // </div>
  );
};

export default App;
