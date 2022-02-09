import { useHistory, useRouteMatch } from "react-router";
import { ValidateFormData } from "../utils/Validate";
import {
  IonButton,
  IonContent,
  IonPage,
  IonChip,
  IonIcon,
  IonLabel,
  IonList,
  IonItemDivider,
  IonItem,
  IonInput,
  IonActionSheet,
  IonToast,
  IonLoading,
} from "@ionic/react";
import {
  checkmarkDone,
  person,
  menu,
  trash,
  share,
  heart,
  add,
} from "ionicons/icons";
import "../css/style.css";
import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";

const Home: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [phoneNo, setPhoneNo] = React.useState<string>("");
  const [showActionSheet, setShowActionSheet] = React.useState<boolean>(false);
  const [showToast, setShowToast] = React.useState<boolean>(false);
  const [showWarning, setShowWarning] = React.useState<boolean>(false);
  const [warning, setWarning] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const match: any = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  // // if(location && location.state) {
  // //   console.log(location.state);
  // // }
  // if(match && match.params){
  //   setFormId(match.params.id);
  // }
  // },[match])

  React.useEffect(() => {
    if (match && match.params && match.params.id) {
      getFormData();
    }
  }, [match]);

  const handleFormData = async() => {
    let reqBody = {
      name: name,
      email: email,
      phoneNumber: +phoneNo,
      address: address,
      service: true,
    };
    let isValidated: boolean = false;
    await ValidateFormData.validator(reqBody)
      .then((result) => (result === true ? (isValidated = true) : isValidated=false))
      .catch((err) => setWarning(err.warning));
    if (isValidated) {
      if (!match.params.id) {
        setLoading(true);
        console.log(reqBody, "body");
        Axios.post("http://localhost:6060/form/add", reqBody)
          .then((response) => {
            const { data } = response;
            dispatch({ type: "Call-Api" });
            setName("");
            setAddress("");
            setEmail("");
            setPhoneNo("");
            setShowToast(true);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(true);
        Axios.patch(`http://localhost:6060/form/${match.params.id}`, reqBody)
          .then(() => {
            dispatch({ type: "Call-Api" });
            setName("");
            setAddress("");
            setEmail("");
            setPhoneNo("");
            setShowToast(true);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    else{
      setShowWarning(true)
    }
    setWarning("");
  };

  const handleFormDelete = () => {
    setShowActionSheet((prev) => !prev);
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNo("");
    history.push("/home");
  };

  const getFormData = () => {
    setLoading(true);
    Axios.get(`http://localhost:6060/form/${match.params.id}`)
      .then((success) => {
        const { data } = success;
        setName(data.name);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNo(data.phoneNumber);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <IonPage>
      <IonContent className="custom theme ion-padding loader-container">
        <div className="fl-between">
          <IonIcon icon={menu} size="large" color="dark" />
          <div></div>
          <IonChip>
            <IonIcon icon={person}></IonIcon>
            <IonLabel>user</IonLabel>
          </IonChip>
        </div>

        <IonToast
          mode={"ios"}
          position={"top"}
          icon={checkmarkDone}
          isOpen={showToast}
          color={"success"}
          onDidDismiss={() => setShowToast(false)}
          message="Form submitted successfully !!!"
          duration={2000}
        />
         <IonToast
          mode={"ios"}
          position={"top"}
          icon={checkmarkDone}
          isOpen={showWarning}
          color={"danger"}
          onDidDismiss={() => setShowWarning(false)}
          message={warning}
          duration={2000}
        />

        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          onDidDismiss={() => setLoading(false)}
          message={"Please wait..."}
          duration={7000}
        />
        <IonList className="layout" mode="ios" inset={true}>
          <IonItemDivider color="warning" />

          <IonItem>
            <IonLabel position="floating" color="primary">
              Enter Your Name...
            </IonLabel>
            <IonInput
              value={name}
              autofocus={true}
              color={"danger"}
              required={true}
              autoCapitalize="words"
              onIonChange={(e) => setName(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating" color="primary">
              Enter Your Email...
            </IonLabel>
            <IonInput
              value={email}
              color={"danger"}
              required={true}
              onIonChange={(e) => setEmail(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating" color="primary">
              Enter Your Address...
            </IonLabel>
            <IonInput
              value={address}
              color={"danger"}
              required={true}
              onIonChange={(e) => setAddress(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating" color="primary">
              Enter Your Phone Number...
            </IonLabel>
            <IonInput
              type="tel"
              value={phoneNo}
              required={true}
              color={"danger"}
              clearInput
              onIonChange={(e) => setPhoneNo(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItemDivider color="warning" />
        </IonList>

        <IonButton onClick={() => setShowActionSheet(true)} expand="block">
          Action
        </IonButton>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              id: "delete-button",
              data: {
                type: "delete",
              },
              handler: handleFormDelete,
            },
            {
              text: "Share",
              icon: share,
              data: 10,
              handler: () => {
                console.log("Share clicked");
              },
            },
            {
              text: "Add",
              icon: add,
              data: "Data value",
              handler: handleFormData,
            },
            {
              text: "Favorite",
              icon: heart,
              handler: () => {
                console.log("Favorite clicked");
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              handler: () => setShowActionSheet(false),
            },
          ]}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};

export default Home;
{
  /* <IonItemDivider>Readonly input</IonItemDivider> */
}
{
  /* <IonItemDivider>Disabled input</IonItemDivider>
  <IonItem>
  <IonInput value={text} disabled></IonInput>
  </IonItem> */
}

{
  /* <IonItemDivider>Inputs with labels</IonItemDivider> */
}
{
  /* 
  <IonItem>
  <IonLabel position="fixed">Fixed Label</IonLabel>
  <IonInput value={text}></IonInput>
  </IonItem>
  
  <IonItem>
  <IonLabel position="stacked">Stacked Label</IonLabel>
  <IonInput value={text}> </IonInput>
  </IonItem>
</IonList> */
}
