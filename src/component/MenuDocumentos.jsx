import * as React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ListadoDocumentos from "../component/ListadoDocumentos";
import { NavLink } from "react-router-dom";

export default function MenuDocumentos(id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        variant="outline"
        colorScheme="white"
        onClick={onOpen}
      >
        Documentos
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Listado de documentos:</DrawerHeader>
          <DrawerBody>
            <Box borderWidth="2px" borderColor="blue.900">
              {<ListadoDocumentos idproducto={id}></ListadoDocumentos>}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <NavLink to={"upload"}>
            <Button colorScheme="blue">Añadir</Button>
            </NavLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
