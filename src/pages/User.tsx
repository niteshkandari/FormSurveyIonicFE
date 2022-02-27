import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { UserList } from "../variables/variables";
import han  from "../images/avatar-han.png";

const Tool: React.FC = () => {
  return (
    <IonPage>
       <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <div className="user-container">
        <div className="img-box"><img src={han} /></div>
        <div className="info-box">
        <div>Han Tester</div>
        </div>
       </div>  
        <IonList>
          {UserList.map((user,key) => {
            return (
              <IonItem key={''+(Math.random() * key)}>
                <IonAvatar slot="start">
                  <img src={user.src} />
                </IonAvatar>
                <IonLabel>
                  <h2>{user.name}</h2>
                  <h3>{user.description_1}</h3>
                  <p>{user.description_2}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tool;
