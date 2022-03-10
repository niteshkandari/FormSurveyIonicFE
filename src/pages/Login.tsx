import { IonContent, IonPage, IonToast } from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./../css/style.css";
import { useAuthFacade } from "../facade/AuthFacade";

const Login = () => {
  const authFacade:any = useAuthFacade();
  const history = useHistory();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn,setSignIn] = useState(false);
  const [showToast,setShowToast] = useState({state:false,message:"",color:""});

  const handleLoginUser = (e: any) => {
    e.preventDefault();
    const reqBody = {
      email: id,
      password: password,
    };
    if(!isSignIn){
    authFacade
      .login(reqBody)
      .then((result: { status: number; data: { token: any } }) => {
        if (result.status === 200) {
          dispatch({ type: "store-token", payload: result.data.token });
          dispatch({ type: "SET-ID", payload: id });
          history.push("/tabs/p/CreateForm");
          setId("");
          setPassword("");
        }
      })
      .catch((err: any) => setShowToast({state:true, message:"Username or passsword is incorrect",color:'danger'})
      );
    }else{
      authFacade.signUp(reqBody).then((result:any) => {
         if(result.status === 201) {
            setShowToast({state:true, message:"Account created successfully",color:'success'});
            setSignIn(false);
         }
      }).catch((err: any) =>  setShowToast({state:true, message:err,color:'danger'}));
    }
  };
  
  const handleChangeScreen = () => {
    setId("");
    setPassword("");
    setSignIn(true);
  }

  return (
    <IonPage>
      <IonContent>
      <IonToast
          mode={"ios"}
          position={"top"}
          isOpen={showToast.state}
          color={showToast.color}
          onDidDismiss={() => setShowToast({state:false,message:"",color:''})}
          message={showToast.message}
          duration={2000}
        />
        <div className="login-page">
          <div className="logo-box">
            <h1>{`${isSignIn ? 'Sign Up' : 'Surveyior 🎠 '}`}</h1>
          </div>
          <form className="login-form" onSubmit={handleLoginUser}>
            <input
              type="email"
              placeholder="Email"
              value={id}
              required={true}
              color={"primary"}
              onChange={(e) => setId(e.target.value)}
            ></input>

            <input
              placeholder="Password"
              type="password"
              value={password}
              required={true}
              color={"primary"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className={"sub-btn"} type="submit">Submit</button>
           {!isSignIn && <button className={'sign-btn'} onClick={handleChangeScreen}>sign up</button>}
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
