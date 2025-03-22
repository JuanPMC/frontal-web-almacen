import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ColumnaDeAcciones = ({ data, deleteAction, updateRoute, event, update = true, download = false }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    const token = ''; // Replace with your actual token
    const url = `https://juanpm.pythonanywhere.com/api/listadosdocumentos/${data.id}/download/`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Basic ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = data.nombre;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <>
      <Button
        size="xs"
        colorScheme="red"
        onClick={() => {
          deleteAction(data.id).then(() => { event(prevState => !prevState) }); // Call the passed delete action
        }}
      >
        Eliminar
      </Button>
      {update && (
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            navigate(updateRoute(data)); // Dynamically navigate using passed route
          }}
        >
          Actualizar
        </Button>
      )}
      {download && (
        <Button
          size="xs"
          colorScheme="green"
          onClick={handleDownload}
        >
          Download
        </Button>
      )}
    </>
  );
};

export default ColumnaDeAcciones;