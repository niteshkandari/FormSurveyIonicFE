import { IonContent, IonPage } from "@ionic/react";
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

  const handleLoginUser = (e: any) => {
    e.preventDefault();
    const reqBody = {
      email: id,
      password: password,
    };
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
      .catch((err: any) => console.error(err));
  };

  return (
    <IonPage>
      <IonContent>
        <div className="login-page">
          <div className="logo-box">
            <h1>Surveyior 🎠 </h1>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
