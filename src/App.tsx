import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Insight from "./pages/Insight";
import Tool from "./pages/Tool";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { heart, calculator, create } from "ionicons/icons";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

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
  return (
    <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact={true} path="/home/edit/:id" component={Home} />
              <Route exact={true} path="/home" component={Home} />
              <Route exact={true} path="/insight" component={Insight} />
              <Route exact={true} path="/tool" component={Tool} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton href="/home" tab="home">
                <IonIcon icon={create} />
                <IonLabel>Create</IonLabel>
              </IonTabButton>

              <IonTabButton href="/insight" tab="insight">
                <IonIcon icon={heart} />
                <IonLabel>Forms</IonLabel>
              </IonTabButton>

              <IonTabButton href="/tool" tab="tool">
                <IonIcon icon={calculator} />
                <IonLabel>tool</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
    </IonApp>
  );
};

export default App;
