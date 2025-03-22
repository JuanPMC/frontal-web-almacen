import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Center, Container } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ColumnaDeAcciones from "../component/ColumnaDeAcciones";
import { deleteListadodocumentos, fetchListadodocumentosWrapper } from "../datos/listadodocumentos";

export default function ListadoDocumentos({ idproducto }) {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const [botonpulsado, setbotonPulsado] = useState();

  

  const handleDelete = async (id) => {
    try {
      await deleteListadodocumentos(id);
      setRowData((prevRowData) => prevRowData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Failed to delete documento:", error);
    }
  };

  const ColunaAccionesAlmacen = (p) => {
    return (
      <ColumnaDeAcciones
        data={p.data}
        deleteAction={() => handleDelete(p.data.id)}
        update={false}
        download={true}
      />
    );
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      editable: false,
    },
    {
      field: "titulo",
      editable: false,
    },
    { field: "fecha", editable: false },
    { field: "documento", editable: true },
    {
      cellRenderer: ColunaAccionesAlmacen,
      filter: "agTextColumnFilter",
      filterParams: { buttons: ["apply", "clear", "cancel", "reset"] },
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idProductoValue = idproducto.idproducto; // Extract the idproducto value
        console.log("Fetching documentos for idproducto:", idProductoValue);
        const documentos = await fetchListadodocumentosWrapper();
        console.log("Documentos fetched:", documentos);

        const resultado = documentos.filter((dato) => {
          console.log("Comparing:", String(dato.producto), "with", String(idProductoValue));
          return String(dato.producto) === String(idProductoValue);
        });

        setRowData(resultado); // Set the filtered documents to rowData
        console.log("Filtered Result:", resultado);
      } catch (error) {
        console.error("Failed to fetch documentos:", error);
      }
    };

    fetchData();
  }, [idproducto]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
    }),
    []
  );

  return (
    <Container
      id="id"
      pl="10px"
      pr="10px"
      pt="0"
      as="section"
      maxWidth="full"
      maxHeight="100%"
    >
      <Center height="0px"></Center>
      <div bg="white" className="ag-theme-quartz" style={{ height: "300px" }}>
        <AgGridReact
          editType="fullRow"
          ref={gridRef}
          rowData={rowData}
          animateRows={true}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiRow"}
          paginationPageSize={10}
          pagination={false}
        ></AgGridReact>
      </div>
    </Container>
  );
}