import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";

import { FC, Fragment } from "react";

const EditProfile: React.FC = () => {
  const formik = useFormik<{}>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <IonPage>
      <Toolbar title={t({ id: "Edit Profile" })} defaultHref="/" />

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow>
                <IonCol size="6">
                  <EditableInput label={t({ id: "First Name" })} />
                </IonCol>

                <IonCol size="6">
                  <EditableInput label={t({ id: "Family Name" })} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput label={t({ id: "Email Address" })} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput label={t({ id: "Mobile Number" })} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput label={t({ id: "Company Name" })} />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <EditableInput label={t({ id: "Company Address" })} />
                </IonCol>
              </IonRow>
            </div>

            <IonButton
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
            >
              <Trans>Done</Trans>
            </IonButton>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

interface EditableInputProps {
  label: string;
}

const EditableInput: FC<EditableInputProps> = ({ label }) => {
  return (
    <Fragment>
      <IonItem lines="none" className="ion-no-padding">
        <IonLabel position="stacked">{label}</IonLabel>

        <IonInput name={label} className="custom"></IonInput>
      </IonItem>
    </Fragment>
  );
};

export default EditProfile;
