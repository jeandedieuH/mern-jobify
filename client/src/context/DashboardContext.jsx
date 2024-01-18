/* eslint-disable react/prop-types */
import { useContext } from "react";
import { createContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DashboardContext = createContext();

function DashboardCtxProvider({ children, userData, queryClient }) {
  const { user } = userData;
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkMode] = useState(checkDefaultTheme);
  const [isAuthError, setIsAuthError] = useState(false);

  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkMode(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logout successful");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error(
      "DashboardContext must be used within a DashboardCtxProvider"
    );
  return context;
}

export { DashboardCtxProvider, useDashboardContext };
