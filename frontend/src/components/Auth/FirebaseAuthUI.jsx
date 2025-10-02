// FirebaseAuthUI.jsx
import React, { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../slices/authSlice";

const FirebaseAuthUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const uiConfig = {
      signInOptions: [GoogleAuthProvider.PROVIDER_ID],
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: async (authResult) => {
          const user = authResult.user;
          console.log("User signed in:", user.displayName);

          try {
            const idToken = await user.getIdToken();
            await dispatch(verifyUser(idToken)).unwrap();
            navigate("/todos");
          } catch (error) {
            console.error("Error verifying user:", error);
          }

          return false; // Prevent default redirect
        },
      },
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);

    return () => {
      // Cleanup if needed
    };
  }, [dispatch, navigate]);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuthUI;
