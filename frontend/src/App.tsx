import React, { useEffect, useContext, useCallback } from "react";

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";
import Login from "./Components/Session/login";

import styles from "./App.module.scss";
import { CraCheckReportProduct } from "plaid";
import Main from "./Main";

const App = () => {

  const { isAuthenticated, user, dispatch } =
    useContext(Context);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        { isAuthenticated && 
        <div>
             Welcome {user}, 
              <Main />     
        </div> } {
        !isAuthenticated && 
          <Login />
       }
      </div>
    </div>
  );
};

export default App;
