import { getAllAccountTrash } from "@app/slice/AccountSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAccountTrash = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.account);
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    };
  }, [filters]);
  useEffect(() => {
    const promise = dispatch(getAllAccountTrash(config));
    return () => promise.abort();
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useAccountTrash;
