import { QueryClient, useQuery } from "@tanstack/react-query";
import { getTableData } from "../api/table";
import { useEffect, useState } from "react";

const useTableData = () => {
  const [currPage, setCurrPage] = useState(1);

  const { data, isFetching, isFetched } = useQuery({
    queryFn: () => getTableData(currPage),
    queryKey: ["table", currPage],
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  });
  useEffect(() => {
    const queryclient = new QueryClient();
    queryclient.prefetchQuery({
      queryKey: ["table", currPage + 1],
      queryFn: () => getTableData(currPage + 1),
    });
  }, [currPage, isFetched]);
  return { data, isFetching, setCurrPage };
};

export default useTableData;
