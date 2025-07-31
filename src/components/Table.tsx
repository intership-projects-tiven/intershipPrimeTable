import "primereact/resources/themes/lara-light-cyan/theme.css";

import { Column } from "primereact/column";
import { useState } from "react";
import { Paginator } from "primereact/paginator";
import SelectRowsForm from "./SelectRowsForm";
import useTableData from "../hooks/useTableData";
import { DataTable } from "primereact/datatable";

const Table = () => {
  const { data, isFetching, setCurrPage } = useTableData();
  const [selectedRows, setSelectedRows] = useState(null);
  const [rowClick, setRowClick] = useState(false);
  function getUserRowSelection(input: number) {
    console.log(input)
  }
  function onPageChange(data: { page: number }) {
    setCurrPage(data.page + 1);
  }
  if (data)
    return (
      <div>
        <DataTable
          value={data?.data}
          tableStyle={{ minWidth: "50rem" }}
          loading={isFetching}
          selectionMode={rowClick ? null : "radiobutton"}
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value)}
          dataKey="id"
          lazy
        >
          <Column
            selectionMode="multiple"
            headerClassName="customHeader"
            headerStyle={{ width: "3rem" }}
            header={() => <SelectRowsForm  getSelectedRows={getUserRowSelection}/>}
          ></Column>

          <Column field="title" header="Title"></Column>
          <Column field="place_of_origin" header="Place of Origen"></Column>
          <Column field="artist_display" header="Artist Display"></Column>
          <Column field="inscriptions" header="Inscriptions"></Column>
          <Column field="date_start" header="Date Start"></Column>
          <Column field="date_end" header="Date end"></Column>
        </DataTable>
        <Paginator
          first={(data.pagination.current_page - 1) * data.pagination.limit}
          rows={data.pagination.limit}
          totalRecords={data.pagination.total}
          onPageChange={onPageChange}
        />
      </div>
    );
};

export default Table;
