import { useQuery } from "@tanstack/react-query";
import { getTableData } from "../api/table";
import { useState } from "react";
const selectedFields = [
          "id",
          "title",
          "place_of_origin",
          "artist_display",
          "inscriptions",
          "date_start",
          "date_end",
        ]
const useTableData = () => {
  const [currPage, setCurrPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryFn: () =>
      getTableData({
        page: currPage,
        fields: selectedFields,
      }),
    queryKey: ["table", currPage],
    staleTime: 0,
    placeholderData: (prev) => prev,
  });

  return { data, isFetching, setCurrPage };
};

export default useTableData;
