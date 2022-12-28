import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";

import { useProductBatchList } from "hooks/useProductBatch";
import { useHistory } from "react-router";
import { useState } from "react";
import { useAddBlockchainInfo, useBlockchainList } from "hooks/useQrCode";
import { useAppState } from "store";
import { print } from "ionicons/icons";

const QrCode: React.FC = () => {
  const { data: products } = useProductBatchList();
  const { data: blockchainList } = useBlockchainList();
  const history = useHistory();
  const [tab, setTab] = useState("1");
  const setLoading = useAppState((state) => state.setLoading);
  const addBlockchainInfo = useAddBlockchainInfo();
  return (
    <IonPage>
      <Toolbar title="QR Code" defaultHref="/" />

      <IonContent fullscreen>
        <IonItem lines="none">
          <b>Select The Batch to Print</b>
        </IonItem>

        <IonSegment value={tab} onIonChange={(e) => setTab(e.target.value!)}>
          <IonSegmentButton value="1">
            <IonLabel className="ion-text-capitalize">
              Generate QR Code
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="2">
            <IonLabel className="ion-text-capitalize">History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Tab 1 */}
        {tab === "1" ? (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {products?.map((product) => (
              <IonItem
                key={product.pbth_code}
                className="ion-no-padding ion-no-margin"
              >
                <IonGrid>
                  <IonRow>
                    <IonCol
                      size="11"
                      onClick={() =>
                        history.push(`/qrcode/${product.pbth_code}`)
                      }
                    >
                      <b>Batch ID: {product.pbth_code} </b>
                      <div>
                        <small>Product Name: {product.pbth_prd_name} </small>
                      </div>
                      <div>
                        <small>Product ID: {product.pbth_prd_code} </small>
                      </div>
                      <div>
                        <small>
                          Manufactured Date: {product.pbth_manufactured_date}{" "}
                        </small>
                      </div>
                      <div>
                        <small>Expiry Date: {product.pbth_expiry_date} </small>
                      </div>
                      <div>
                        <small>Print Count: 11 </small>
                      </div>
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon icon={print} onClick={() => {}} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {blockchainList?.map((bc) => (
              <IonItem
                key={bc.bc_qr_code}
                className="ion-no-padding ion-no-margin"
              >
                <IonGrid fixed={true}>
                  <IonRow>
                    <IonCol
                      size="11"
                      onClick={() =>
                        history.push(`/qrcodeHistory/${bc.bc_qr_code}`)
                      }
                    >
                      <div className="wrap-text">
                        <b>Unique ID: {bc.bc_qr_code} </b>
                      </div>
                      <div>
                        <small>Product Name: {bc.bc_prd_name} </small>
                      </div>
                      <div>
                        <small>Product ID: {bc.bc_pbth_code} </small>
                      </div>
                      <div>
                        <small>
                          Manufactured Date: {bc.bc_pbth_manufactured_date}
                        </small>
                      </div>
                      <div>
                        <small>Expiry Date: {bc.bc_pbth_expiry_date} </small>
                      </div>
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon icon={print} onClick={() => {}} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QrCode;
