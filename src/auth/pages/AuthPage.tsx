import { LoginView, RegisterView } from "./views";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "./AuthPage.css";

export const AuthPage = () => {
  const { errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Authentication failed", errorMessage, "error");
    }
  }, [errorMessage]);
  return (
    <div className="container login-container">
      <div className="row">
        <LoginView />
        <RegisterView />
      </div>
    </div>
  );
};
