import { AxiosError } from "axios";
import {
  onLogoutCalendar,
  setAuthenticated,
  setChecking,
  setErrorMessage,
  setNotAuthenticated,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(setChecking());
    try {
      const {
        data: { name, token, uid },
      } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(setAuthenticated({ name, token, uid }));
    } catch {
      dispatch(setNotAuthenticated("Invalid credentials"));
      setTimeout(() => {
        dispatch(setErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(setChecking());
    try {
      const {
        data: { name: username, token, uid },
      } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });

      dispatch(setAuthenticated({ name: username, token, uid }));
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ msg: string }>).response?.data?.msg ||
        "Invalid data";
      dispatch(setNotAuthenticated(errorMessage));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setNotAuthenticated());
      return;
    }

    try {
      const {
        data: { name, token: newToken, uid },
      } = await calendarApi.get("/auth/renew");
      dispatch(setAuthenticated({ name, token: newToken, uid }));
      localStorage.setItem("token", newToken);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
    } catch {
      localStorage.clear();
      dispatch(setNotAuthenticated());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(setNotAuthenticated());
  };

  return {
    errorMessage,
    status,
    user,

    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
