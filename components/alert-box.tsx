"use client";

import { useAlerts } from "@/app/providers/alert-provider";
import { Alert } from "@/components/alert";

export default function AlertBox() {
  const { alerts } = useAlerts();

  return (
    <div className={"fixed bottom-0 left-0 m-1 md:m-4"} id={"global-alert"}>
      {alerts.map((alert) => {
        return (
          <Alert key={alert.uid}
                 uid={alert.uid}
                 type={alert.type}
                 title={alert.title}>
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
}