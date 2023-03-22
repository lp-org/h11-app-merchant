import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { add } from "ionicons/icons";

import { useProductBatchPagination } from "hooks/useProductBatch";
import { useHistory } from "react-router";
import { t, Trans } from "@lingui/macro";
import React from "react";

const ProductBatch: React.FC = () => {
  const {
    data: products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProductBatchPagination();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Product Batch" })}
        defaultHref="/"
        action={
          <IonButton
            fill="solid"
            onClick={() => history.push("/productBatch/add")}
          >
            <IonIcon icon={add} style={{ color: "#fff" }} />
          </IonButton>
        }
      />

      <IonContent fullscreen className="ion-padding">
        <IonList lines="full" style={{ background: "transparent" }}>
          <IonSearchbar placeholder={t({ id: "Search" })} />
          {products?.pages?.map((group) => (
            <React.Fragment>
              {group.result?.map((product) => (
                <IonItem key={product.pbth_code}>
                  <IonLabel
                    onClick={() =>
                      history.push(`/productBatch/${product.pbth_code}`)
                    }
                  >
                    <b>
                      <Trans>Batch ID</Trans>: {product.pbth_code}
                    </b>
                    <div>
                      <small>
                        <Trans>Product Name</Trans>: {product.pbth_prd_name}
                      </small>
                    </div>
                    <div>
                      <small>
                        <Trans>Product ID</Trans>: {product.pbth_prd_code}
                      </small>
                    </div>
                    <div>
                      <small>
                        <Trans>Manufactured Date</Trans>:
                        {product.pbth_manufactured_date}
                      </small>
                    </div>
                    <div>
                      <small>
                        <Trans>Expiry Date</Trans>: {product.pbth_expiry_date}
                      </small>
                    </div>
                  </IonLabel>
                </IonItem>
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && (
            <div>
              <IonButton
                expand="block"
                className="text-white ion-margin-top"
                onClick={() => {
                  fetchNextPage();
                }}
              >
                {isFetchingNextPage ? <>Loading</> : <Trans>Load More</Trans>}
              </IonButton>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProductBatch;
