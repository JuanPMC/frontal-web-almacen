import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Container,
  Input,
  VStack,
  Flex,
  Spacer,
  Heading,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { addListadodocumentos } from "../../datos/listadodocumentos";
import { TfiUpload } from "react-icons/tfi";

export default function UploadDocument() {
  const { id } = useParams(); // Get the id value from the URL
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const [formData, setFormData] = useState({
    titulo: "",
    documento: "",
    fecha: "2025-03-01",
    datos_del_documento: "",
    producto: "", // Initialize producto as an empty string
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      producto: id, // Set the producto field to the id value
    }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, datos_del_documento: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addListadodocumentos(formData);
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container
      id="almac"
      pl="10px"
      pr="10px"
      pt="120"
      as="section"
      maxWidth="100%"
      maxHeight="100%"
      centerContent
    >
    <Box borderWidth="2px" borderColor="blue.900" width={1000}>
    <Box
          textAlign="center"
          fontSize={28}
          pb="1"
          bg="blue.900"
          color="yellow"
        >
          <Flex p="2">
            
            <Spacer />
            <Text textAlign="center" fontSize={28}>
              Subir Documento
            </Text>
            <Spacer />
            <button onClick={() => navigate(-1)}>{} ↩️</button>
          </Flex>
        </Box>
      <Divider mb="3" />
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
        <HStack spacing={4} mb={3}>
          <FormControl 
          borderColor="blue.900"
          pl="10px"
          width={300}
          isRequired
          >
            <FormLabel htmlFor="titulo">
              <Text fontWeight="bold">Título</Text>
            </FormLabel>
            <Input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingrese el título"
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl
              borderColor="blue.900"
              pl="10px"
              width={450}
              isRequired
            >
              <FormLabel htmlFor="documento">
              <Text fontWeight="bold">Documento</Text>
            </FormLabel>
            <Input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              placeholder="Ingrese el nombre del documento"
              focusBorderColor="blue.500"
            />
            </FormControl>

          

          <FormControl 
          borderColor="blue.900"
          pl="10px"
          width={280}
          isRequired>
            <FormLabel htmlFor="fecha">
              <Text fontWeight="bold">Fecha</Text>
            </FormLabel>
            <Input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl 
          borderColor="blue.900"
          pl="10px"
          width={370}
          isRequired>
            <FormLabel htmlFor="datos_del_documento">
              <Text fontWeight="bold">Archivo</Text>
            </FormLabel>
            <Input
              type="file"
              id="datos_del_documento"
              name="datos_del_documento"
              onChange={handleFileChange}
              focusBorderColor="blue.500"
            />
          </FormControl>
          </HStack>
          <HStack justify="center" spacing={6} mt="4">
            <Button 
            colorScheme="blue"
            size="lg" 
            type="submit"
            variant="outline"
            leftIcon={< TfiUpload/>}
            >
              Subir
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
    </Container>
  );
}