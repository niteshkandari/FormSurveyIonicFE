import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import React from "react";
  const Tool: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tool</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>Tool</IonContent>
      </IonPage>
    );
  };
  
  export default Tool;
  