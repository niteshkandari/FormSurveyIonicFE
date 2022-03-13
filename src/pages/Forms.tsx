import { useHistory } from "react-router";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
  IonToast,
  IonLoading,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { pencil, trash, sad } from "ionicons/icons";
import "../css/style.css";
import { FC, useEffect, useState } from "react";
import { useFacade } from "../facade/facade";

const Forms: FC = () => {
  const [formData, setFormData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  const facade:any = useFacade();

  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
 
   useEffect(() => {
    let mounted = false;
    if (!mounted) {
      getFormData();
    }
    return () => {
      mounted = true;
    };
  }, []);

  const getFormData = async () => {
    setShowLoading(true);
    facade.getAllForms().then(async(response: { data: any; }) =>{
      const data = await response.data;
      setFormData(data.Form);
      setShowLoading(false);
    }) .catch((error: any) => {
      console.error(error);
    });
  };

  const handleDeleteEntry = (id: number) => {
    setShowLoading(true);
    setShowToast(true);
    facade.deleteForm(id).then((res: any) => {
      let filterd = formData.filter((item: any) => item._id !== id);
      setFormData(filterd);
      setShowLoading(false);
      setShowToast(false);
    }) .catch((error: any) => {
      console.log(error);
    });
  };

  const handleEditEntry = (id: number) => {
    history.push({
      pathname: `/tabs/p/CreateForm/edit/${id}`
    });
  };

  const getTheme: any = () => {
    let n = 0;
    const dynamicTheme: any = {
      0: "secondary",
      1: "primary",
      2: "success",
      3: "warning",
      4: "danger",
    };
    n = Math.floor(Math.random() * 4);
    return dynamicTheme[n];
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Forms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToast
          mode={"ios"}
          position={"top"}
          icon={trash}
          isOpen={showToast}
          color={"success"}
          onDidDismiss={() => setShowToast(false)}
          message="Form submitted successfully !!!"
          duration={2000}
        />

        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={7000}
        />
        {/* {(formData && formData.length > 0) ? ( */}
          <IonSlides pager={false} options={slideOpts}>
            {formData && formData?.map(({_id:id,name,phoneNumber,email,address,service=false}, idx: number) => (
              <IonSlide key={id + idx}>
                <IonCard color={getTheme()} className="height-full">
                  <IonCardHeader>
                    <IonCardTitle>Form : {idx + 1}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <div className="grid">
                      <IonLabel>
                        <span className={"text-box"}>id</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{(id+'').slice(0,14)}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>name</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{name}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>email</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{email}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>address</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{address}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>phone number</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{phoneNumber}</span>
                      </IonLabel>
                      <IonLabel>
                      <span className={"text-box"}>Service Continue</span>
                      </IonLabel>
                      <IonLabel>
                      <span className={"text-box"}>{service ? 'yes' : 'no'}</span>
                      </IonLabel>
                    </div>
                    <IonButton
                      onClick={() => handleEditEntry(id)}
                      fill={"outline"}
                      color={"light"}
                      expand="block"
                    >
                      <IonIcon slot="start" icon={pencil} />
                      Edit
                    </IonButton>
                    <IonButton
                      onClick={() => handleDeleteEntry(id)}
                      fill={"outline"}
                      color={"light"}
                      expand="block"
                    >
                      <IonIcon slot="start" icon={trash} />
                      Delete
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonSlide>
            ))}
          </IonSlides>
        {/* ) : ( */}
          {/* <> */}
            {/* {(
              <IonCard color={getTheme()} className="height-full">
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <IonIcon
                    style={{ fontSize: "200px" }}
                    slot="start"
                    icon={sad}
                  />
                  <span
                    style={{
                      border: "3px solid",
                      fontSize: "50px",
                      fontWeight: "bold",
                      padding: "7px",
                    }}
                  >
                    No Data
                  </span>
                </div>
              </IonCard>
            )}
          </>
        )} */}
      </IonContent>
    </IonPage>
  );
};

export default Forms;
