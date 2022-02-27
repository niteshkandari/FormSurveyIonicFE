import React from 'react';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { create, heart, person } from "ionicons/icons";
import { Redirect, Route } from "react-router";

const PageRoutes = React.lazy(() => import("./PageRoutes"))
// import PageRoutes from "./PageRoutes";

const TabsRoutes = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tabs/p" component={PageRoutes} />
          <Redirect exact={true} path="/" to="/tabs/p/CreateForm" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton href="/tabs/p/CreateForm" tab="CreateForm">
            <IonIcon icon={create} />
            <IonLabel>Create</IonLabel>
          </IonTabButton>

          <IonTabButton href="/tabs/p/Forms" tab="Forms">
            <IonIcon icon={heart} />
            <IonLabel>Forms</IonLabel>
          </IonTabButton>

          <IonTabButton href="/tabs/p/User" tab="tool">
            <IonIcon icon={person} />
            <IonLabel>Users</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default TabsRoutes;
