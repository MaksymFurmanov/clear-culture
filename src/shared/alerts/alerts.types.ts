import alertConfig from "@/src/shared/alerts/alerts.config";

export type AlertType = keyof typeof alertConfig;

export type AlertProps = {
  uid: string,
  type: AlertType,
  title: string,
  message?: string
  callbackAction?: () => void,
}

