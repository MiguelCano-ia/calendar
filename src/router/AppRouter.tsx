import { AuthPage } from "../auth";
import { CalendarPage } from "../calendar";
import { CheckingAuth } from "../auth/components/CheckingAuth";
import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "../auth/hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="auth/*" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
