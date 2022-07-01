import logo from './logo.svg';
import './App.css';
import Header  from './components/Main/Header';
import Layout  from './components/DashBoard/Layout';
import PendingMapping from "./components/PendingMapping/PendingMapping";
import FinalMapping from "./components/FinalMapping/FinalMapping";
import AuditHistory from "./components/AuditHistory/AuditHistory";
import ExpandableTable from "./components/ExpandableGrid/ExpandableTable";
import NotFoundPage from "./components/ErrorHandler/NotFoundPage";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import theme from "./styles/Muitheme";
import { createTheme, ThemeProvider , withStyles } from "@mui/material/styles";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import oktaServiceConfig from "./config/OktaServiceConfig";
import * as uiConstants from "./constants/uiConstants";


//Load OKTA Configuration
const oktaAuth = new OktaAuth(oktaServiceConfig);


function App() {

  const [Oktalogin, setOktalogin] = useState(true);
  const _history = useHistory();
  let location = useLocation();
  const [loginpage, setloginpage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [authRequiredModalOpen, setAuthRequiredModalOpen] = React.useState(false);

/* OKTA code starte */
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    _history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  const triggerLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const customAuthHandler = async () => {
    const previousAuthState = oktaAuth.authStateManager.getPreviousAuthState();
    if (!previousAuthState || !previousAuthState.isAuthenticated) {
      // App initialization stage
      await triggerLogin();
    } else {
      // Ask the user to trigger the login process during token autoRenew process
      setAuthRequiredModalOpen(true);
    }
  };

/* OKTA Code end */


  useEffect(() => {
    document.title = "McKesson-Pramata Cutomer App";
  }, []);
 

  return (


    
    <div className="App">
    {/* //  <ThemeProvider theme={theme}> */}
    <Security     
    oktaAuth={oktaAuth}
    onAuthRequired={customAuthHandler}
    restoreOriginalUri={restoreOriginalUri}
    >
    <Header></Header>  
     <Switch>
       <SecureRoute exact path="/"  component={Header} />
       <SecureRoute exact path={uiConstants.RT_Dashboard}  component={Layout} />
       <SecureRoute exact path={uiConstants.RT_PendingMapping} component={PendingMapping} />
       <SecureRoute exact path={uiConstants.RT_FinalMapping}  component={FinalMapping} />
       <SecureRoute exact path={uiConstants.RT_AuditHistory}  component={AuditHistory} />
       <SecureRoute exact path={uiConstants.RT_ExpandableGrid}  component={ExpandableTable} />
       {/* <Route path='*' exact={true} component={NotFoundPage} /> */}
       <Route path={uiConstants.RT_callback} component={LoginCallback} />
     </Switch>
    </Security>
    </div>
    // </ThemeProvider>
  );
}

export default App;
