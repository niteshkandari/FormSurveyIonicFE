import { IonReactRouter } from "@ionic/react-router";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import "@ionic/react/css/core.css";
import { useDispatch } from "react-redux";
import { HttpApiServiceProvider } from "./services/Http.Api.service";
import Login from "./pages/Login";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Menu from "./pages/Menu";
import TabsRoutes from "./pages/TabsRoutes";
import { checkAutoLogin, checkUserIsLoggedIn } from "./AuthService/AuthService";
import { FacadeLayerProvider } from "./facade/facade";
import { AuthProvider } from "./facade/AuthFacade";
/* Core CSS required for Ionic components to work properly */

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAutoLogin(dispatch);
  }, []);

  return (
    <IonApp>
      <HttpApiServiceProvider>
        <AuthProvider>
        <FacadeLayerProvider>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              {checkUserIsLoggedIn() && <Menu />}
              <IonRouterOutlet id={"main"}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/tabs" component={TabsRoutes} />
                  <Redirect exact path="/" to="/login" />
                </Switch>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </FacadeLayerProvider>
        </AuthProvider>
      </HttpApiServiceProvider>
    </IonApp>
  );
};

export default App;
