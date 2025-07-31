import {  useQuery } from "@tanstack/react-query";
import { getTableData } from "../api/table";
import {  useState } from "react";

const useTableData = () => {
  const [currPage, setCurrPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryFn: () => getTableData({page: currPage}),
    queryKey: ["table", currPage],
    staleTime: 0,
    placeholderData: (prev) => prev,

  });

  return { data, isFetching, setCurrPage };
};

export default useTableData;
