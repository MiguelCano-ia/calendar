import { useEffect } from "react";
import { AuthPage } from "../auth";
import { useAuthStore } from "../auth/hooks";
import { CalendarPage } from "../calendar";
import { Navigate, Route, Routes } from "react-router";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <div>Loading...</div>;
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
