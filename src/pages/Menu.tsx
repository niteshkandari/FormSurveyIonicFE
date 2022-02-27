import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { menutItems } from "../variables/variables";
import { useDispatch } from "react-redux";
import React from "react";
import { logOutUser } from "../AuthService/AuthService";
import han from "../images/avatar-han.png";
import { useSelector } from "react-redux";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state:any) => state.userReducer.id)
  return (
    <IonMenu type="overlay" contentId="main">
      <IonContent>
        <IonList id="inbox-list">
          <IonItem>
          <IonAvatar>
            <img src={han} />
          </IonAvatar>
          </IonItem>
          <IonListHeader>User {userId.slice(0,4)}</IonListHeader>
          <IonNote>{userId}</IonNote>
          {menutItems.map((menu, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  // className={
                  // location.pathname === menu.url ? "selected" : ""
                  // }
                  routerLink={menu.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={menu.iosIcon} />
                    {menu.title.includes("Log Out") ? (
                      <IonLabel onClick={() => logOutUser(dispatch)}>
                        {menu.title}
                      </IonLabel>
                    ) : (
                      <IonLabel>{menu.title}</IonLabel>
                    )}
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
