import { useEffect, useRef } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import { useToastContext } from "../contexts/ToastContext";

interface UseOfflineDetectionParams {
  isFetching: boolean;
}

export const useOfflineDetection = ({ isFetching }: UseOfflineDetectionParams) => {
  const { isOffline } = useNetworkStatus();
  const toast = useToastContext();
  const wasFetchingRef = useRef(false);
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (isFetching) {
      wasFetchingRef.current = true;
      hasShownToastRef.current = false;
    }

    if (wasFetchingRef.current && isOffline && !hasShownToastRef.current) {
      toast.showWarning(
        "Conexão perdida durante a busca. Dados em cache podem estar disponíveis."
      );
      hasShownToastRef.current = true;
    }

    if (!isFetching) {
      wasFetchingRef.current = false;
    }
  }, [isFetching, isOffline, toast]);
};

