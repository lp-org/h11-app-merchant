import { useIonToast } from "@ionic/react";

import { useCallback } from "react";
import "./toast.css";
type PopUpMessageType = "success" | "error";

export function usePopUpMessage() {
  const [present] = useIonToast();

  return useCallback(
    (message: string, type: PopUpMessageType, header?: string) =>
      present({
        message,
        header,
        icon:
          type === "success"
            ? "/assets/icon/success.svg"
            : "/assets/icon/error.svg",

        duration: 2000,
        position: "top",
        cssClass: "margin-top:40px",

        buttons: [
          {
            text: "x",
            role: "cancel",
          },
        ],
      }),
    [present]
  );
}
