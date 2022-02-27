import { useHistory, useRouteMatch } from "react-router";
import { ValidateFormData } from "../utils/Validate";
import {
  IonButton,
  IonContent,
  IonPage,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonActionSheet,
  IonToast,
  IonLoading,
  IonToggle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,} from "@ionic/react";
import { checkmarkDone, trash, share, heart, add } from "ionicons/icons";
import "../css/style.css";
import React,{useEffect, useState} from "react";
import { useFacade } from "../facade/facade";

const CreateForm: React.FC = () => {
  const facade:any = useFacade();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const match: any = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (match && match.params && match.params.id) {
      getFormData();
    }
  }, [match.params.id]);
  
  useEffect(() => {
    let mounted = false;
    if (mounted) {
      getFormData();
    }
    return () => {
      mounted = true;
    };
  }, []);
  
  const resetStates = () => {
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNo("");
    setShowToast(true);
    setLoading(false);
  };

  const handleFormData = async () => {
    let reqBody = {
      name: name,
      email: email,
      phoneNumber: +phoneNo,
      address: address,
      service: toggle,
    };
    let isValidated: boolean = false;
    await ValidateFormData.validator(reqBody)
      .then((result) =>
        result === true ? (isValidated = true) : (isValidated = false)
      )
      .catch((err) => setWarning(err.warning));
    if (isValidated) {
      if (!match.params.id) {
        setLoading(true);
        facade.createForm(reqBody).then((response: { data: any; }) => {
          const { data } = response;
          if (response) {
            resetStates();
          }
        })
        .catch((error: any) => {
          setWarning("something went wrong");
          setShowWarning(true);
        });
      } else {
        setLoading(true);
        facade.updateForm({id:match.params.id,body:reqBody}).then(() => {
            resetStates();
            history.replace("/tabs/p/createForm");
          })
          .catch((error:any) => {
            console.error(error);
          });
      }
    } else {
      setShowWarning(true);
    }
    setWarning("");
  };

  const handleFormDelete = () => {
    setShowActionSheet((prev) => !prev);
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNo("");
    history.replace("/tabs/p/CreateForm");
  };

  const getFormData = () => {
    setLoading(true);
    facade.getFormById(match.params.id).then((success: { data: any; }) => {
      const { data } = success;
      console.log(data, "success");
      setName(data.name);
      setAddress(data.address);
      setEmail(data.email);
      setPhoneNo(data.phoneNumber);
      setLoading(false);
    })
    .catch((err: any) => {
      console.log(err);
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Create Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding loader-container">
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
        <IonList id="main-content" className="layout" mode="ios" inset={true}>
          {/* <IonItemDivider color="warning" /> */}

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

          <IonItem>
            <IonLabel color="primary">Continue Service</IonLabel>
            <IonToggle
              checked={toggle}
              onIonChange={() => setToggle((prev) => !prev)}
              slot="end"
              color="secondary"
            />
          </IonItem>
          {/* <IonItemDivider/> */}
          <IonItem />
        </IonList>

        <IonButton
          color="secondary"
          onClick={() => setShowActionSheet(true)}
          expand="block"
        >
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

export default CreateForm;
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
