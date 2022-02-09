import { useHistory } from "react-router";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
} from "@ionic/react";
import { pencil, trash, sad } from "ionicons/icons";
import Axios from "axios";
import "../css/style.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Insight: React.FC = () => {
  const [formData, setFormData] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const shouldCall = useSelector((state: any) => state.loadApi);
  const dispatch = useDispatch();
  const history = useHistory();

  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  React.useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getFormData();
      if (shouldCall) {
        getFormData();
        dispatch({ type: "Reset" });
      }
    }
    return () => {
      unmounted = true;
    };
  }, [shouldCall]);

  const getFormData = () => {
    setShowLoading(true);
    Axios.get("http://localhost:6060/form/")
      .then((response) => {
        const { data } = response;
        console.log(data);
        // setTimeout(() => {
        setFormData(data.Form);
        setShowLoading(false);
        // },1000)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteEntry = (id: number) => {
    console.log(formData, "before del");
    setShowLoading(true);
    setShowToast(true);
    Axios.delete(`http://localhost:6060/form/${id}`)
      .then((res) => {
        let filterd = formData.filter((item: any) => item._id != id);
        setFormData(filterd);
        setShowLoading(false);
        setShowToast(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditEntry = (id: number) => {
    history.push({
      pathname: `/home/edit/${id}`,
      // state: {
      //   id: id,
      // },
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
          <IonTitle>Insight</IonTitle>
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
        {!showLoading && formData.length > 0 ? (
          <IonSlides pager={false} options={slideOpts}>
            {formData.map((item: any, id: any) => (
              <IonSlide key={item._id + id}>
                <IonCard color={getTheme()} className="height-full">
                  <IonCardHeader>
                    {/* <IonCardSubtitle>Form : {id+1}</IonCardSubtitle> */}
                    <IonCardTitle>Form : {id + 1}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <div className="grid">
                      <IonLabel>
                        <span className={"text-box"}>id</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{item._id}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>name</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{item.name}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>email</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{item.email}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>address</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{item.address}</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>phone number</span>
                      </IonLabel>
                      <IonLabel>
                        <span className={"text-box"}>{item.phoneNumber}</span>
                      </IonLabel>
                    </div>
                    <IonButton
                      onClick={() => handleEditEntry(item._id)}
                      fill={"outline"}
                      color={"light"}
                      expand="block"
                    >
                      <IonIcon slot="start" icon={pencil} />
                      Edit
                    </IonButton>
                    <IonButton
                      onClick={() => handleDeleteEntry(item._id)}
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
        ) : (
          <>
            {!showLoading && (
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default Insight;
