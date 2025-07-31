import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import SelectRowsForm from "./SelectRowsForm";
import useTableData from "../hooks/useTableData";
import {
  DataTable,
  type DataTableSelectAllChangeEvent,
} from "primereact/datatable";
import { getTableData, type TableData } from "../api/table";

const Table = () => {
  const { data, isFetching, setCurrPage } = useTableData();
  const [selectedRows, setSelectedRows] = useState<TableData[] | []>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    if (!selectedRows || !data?.data) return setSelectAll(false);
    const isAllSelected =
      selectedRows.length > 0 &&
      data.data.every((row) =>
        selectedRows.some((selected: { id: number }) => selected.id === row.id)
      );

    setSelectAll(isAllSelected);
  }, [data?.data, selectedRows]);

  //  this will select require rows
  async function getUserRowSelection(input: number) {
    setIsSelecting(true);
    const data = await getTableData({ limit: input });
    setIsSelecting(false)
    setSelectedRows(data.data);
  }
  // type not working DataTableSelectionChangeEvent fix later
  function onSelectionChange(event: { value: TableData[] }) {
    const value = event.value;

    setSelectedRows(value);
    setSelectAll(value.length === data?.data.length);
  }
  // effect only rows which are visual
  function onSelectAllChange(event: DataTableSelectAllChangeEvent) {
    const selectAll = event.checked;
    if (selectAll) {
      setSelectAll(true);
      setSelectedRows((prev) => {
        const existingIds = new Set(prev.map((row) => row.id));
        const merged = [...prev];

        data?.data.forEach((row) => {
          if (!existingIds.has(row.id)) {
            merged.push(row);
          }
        });

        return merged;
      });
    } else {
      setSelectAll(false);
      const currentPageIds = data?.data.map((row) => row.id);
      if (!currentPageIds) return;
      const newSelectedRows = selectedRows.filter(
        (row) => !currentPageIds.includes(row.id)
      );
      setSelectedRows(newSelectedRows);
    }
  }

  if (data)
    return (
      <div>
        <DataTable
          value={data?.data}
          tableStyle={{ minWidth: "50rem" }}
          loading={isFetching}
          selection={selectedRows}
          selectAll={selectAll}
          selectionMode="checkbox"
          onSelectionChange={onSelectionChange}
          onSelectAllChange={onSelectAllChange}
          dataKey="id"
          first={(data.pagination.current_page - 1) * data.pagination.limit}
          rows={data.pagination.limit}
          totalRecords={data.pagination.total}
          onPage={(event) => {
            if (event.page !== undefined) setCurrPage(event.page + 1);
          }}
          paginator={true}
          lazy
        >
          <Column
            selectionMode="multiple"
            headerClassName="customHeader"
            headerStyle={{ width: "3rem" }}
            header={() => (
              <SelectRowsForm getSelectedRows={getUserRowSelection} isLoading={isSelecting}/>
            )}
          ></Column>

          <Column field="title" header="Title"></Column>
          <Column field="place_of_origin" header="Place of Origen"></Column>
          <Column field="artist_display" header="Artist Display"></Column>
          <Column field="inscriptions" header="Inscriptions"></Column>
          <Column field="date_start" header="Date Start"></Column>
          <Column field="date_end" header="Date end"></Column>
        </DataTable>
      </div>
    );
};

export default Table;
