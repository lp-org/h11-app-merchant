import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router";
import { PaginationProps } from "types/product";
import {
  AddProductBatchProps,
  ProductBatch,
  ProductBatchResponse,
} from "types/productBatch";
import { requestV2 as request } from "utils/request";
import { usePopUpMessage } from "./notification";
import { useLanguage } from "./useLanguage";

interface ProductBatchInfo {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
}

interface useAddProductBatchProps {
  size?: number;
  page?: number;
}

export function useProductBatchList() {
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["productBatchList"],
    queryFn: async (): Promise<ProductBatch[]> => {
      const res = await request.get<AxiosResponse<ProductBatchResponse[]>>(
        "/product_batch/showall"
      );
      const productBatch = res.data.data;
      const result = productBatch.map(
        ({
          pbth_code,
          pbth_expiry_date,
          pbth_manufactured_date,
          pbth_prd_code,
          prd_image,
          pbth_bc_count,
          pbth_prd_name,
        }) => ({
          pbth_code,
          pbth_expiry_date,
          pbth_manufactured_date,
          pbth_prd_code,
          prd_image,
          pbth_bc_count,
          pbth_prd_name: getString(pbth_prd_name),
        })
      );
      return result;
    },
  });
}

export function useProductBatchPagination({
  size = 5,
  page = 0,
}: useAddProductBatchProps = {}) {
  const { getString } = useLanguage();
  return useInfiniteQuery({
    queryKey: ["productBatchList", size, page],
    queryFn: async ({
      pageParam,
    }): Promise<{ result: ProductBatch[] } & PaginationProps> => {
      const res = await request.get<
        AxiosResponse<ProductBatchResponse[]> & PaginationProps
      >("/product_batch/showall", { params: { page: pageParam?.page, size } });
      const productBatch = res.data.data;

      const { totalPages, totalElements, nextCursor } = res.data;
      const result = productBatch?.map(
        ({
          pbth_code,
          pbth_expiry_date,
          pbth_manufactured_date,
          pbth_prd_code,
          prd_image,
          pbth_bc_count,
          pbth_prd_name,
        }) => ({
          pbth_code,
          pbth_expiry_date,
          pbth_manufactured_date,
          pbth_prd_code,
          prd_image,
          pbth_bc_count,
          pbth_prd_name: getString(pbth_prd_name),
        })
      );

      return {
        result,
        totalPages,
        totalElements,
        nextCursor,
        page: pageParam?.page || page,
      };
    },
    getNextPageParam: ({ nextCursor, totalElements, totalPages, page }) =>
      nextCursor
        ? {
            nextCursor,
            totalElements,
            totalPages,
            page: page !== undefined ? page + 1 : 0,
          }
        : undefined,
  });
}

export function useAddProductBatch() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const popUpMsg = usePopUpMessage();
  return useMutation(
    async (payload: AddProductBatchProps) => {
      const res = await request.post("/product_batch/add", payload);
      if (res.data.code === 200) {
        popUpMsg("Product batch have been successfully created!", "success");
        queryClient.invalidateQueries(["productBatchList"]);
        return res;
      } else {
        popUpMsg(res.data.message, "error");
        throw new Error(res.data.message);
      }
    },
    {
      onSuccess: () => {
        history.replace("/productBatch");
      },
    }
  );
}

export function useGetProductBatchById(code: string) {
  const { getString } = useLanguage();
  return useQuery({
    queryFn: async (): Promise<ProductBatch> => {
      const productBatch = (
        await request.get<AxiosResponse<ProductBatchResponse>>(
          `/product_batch/show/${code}`
        )
      ).data.data;
      const {
        pbth_code,
        pbth_expiry_date,
        pbth_manufactured_date,
        pbth_prd_code,
        prd_image,
        pbth_bc_count,
        pbth_prd_name,
      } = productBatch;
      return {
        pbth_code,
        pbth_expiry_date,
        pbth_manufactured_date,
        pbth_prd_code,
        prd_image,
        pbth_bc_count,
        pbth_prd_name: getString(pbth_prd_name),
      };
    },
  });
}

export function useGetProducBatchCodeByProductId(code: string) {
  return useQuery({
    queryKey: ["productBatchId", code],
    queryFn: async (): Promise<ProductBatchInfo> =>
      (await request.get(`/product_batch/getbatchinfo/${code}`)).data.data,
    enabled: !!code,
  });
}
