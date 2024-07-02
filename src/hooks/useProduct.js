import productApi from "@api/ProductApi";
import { CanceledError } from "axios";
import { useEffect, useMemo, useState } from "react";

const useProduct = (filters) => {
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _category: filters?._category,
      },
    };
  }, [filters]);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 20,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = productApi.getWithParams(config);
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const res = await request;
        if (res && res.status === "success") {
          const { data, pagination } = res;
          setProductList(data);
          setPagination(pagination);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(true);
      }
    };
    getProductList();
    return () => cancel();
  }, [config]);

  return { productList, pagination, isLoading, error };
};

export default useProduct;
