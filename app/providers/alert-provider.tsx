"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { AlertProps } from "@/types";
import { v4 as uuid } from "uuid";
import { AlertType } from "@/components/alert";

const AlertContext = createContext<
  {
    alerts: AlertProps[],
    removeById: (uid: string) => void,
    addAlert: (type: AlertType, title: string, message?: string) => void,
  }
  | undefined
>(undefined);

export const AlertProvider = ({ children }: {
  children: ReactNode
}) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const removeById = (uid: string) => {
    setAlerts((prevState) => [...prevState].filter((alert) => alert.uid !== uid));
  };

  const addAlert = (type: AlertType, title: string, message?: string) => {
    const uid = uuid();
    const alert: AlertProps =  { uid, type, title, message };

    setAlerts((prevState) => [...prevState, alert]);
    setTimeout(() => {
      removeById(uid);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alerts, removeById, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("Error providing alerts");
  return context;
};