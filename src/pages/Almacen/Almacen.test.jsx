import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Wrap with Router since you're using NavLink
import Almacen from "./Almacen"; // Adjust the path as necessary
import * as datos from "../../datos/almacenes"; // Adjust to import the fetchAlmacenes mock
import { vi } from 'vitest';
import { ChakraProvider } from "@chakra-ui/react";  // Ensure ChakraProvider is imported

// Mocking fetchAlmacenes function
vi.mock("../../datos/almacenes", () => ({
  fetchAlmacenes: vi.fn().mockResolvedValue([{ id: 1, almacen: 'Almacen 1', laboratorio: "lab" }, { id: 2, almacen: 'Almacen 1',laboratorio: "lab2"}]),
  fetchAlmacenById: vi.fn().mockResolvedValue([{ id: 2, almacen: 'Almacen 1',laboratorio: "lab2"}]),
  addAlmacen: vi.fn(),
  updateAlmacen: vi.fn(),
  deleteAlmacen: vi.fn()
}));
  

describe("Almacen Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    datos.fetchAlmacenes.mockReset();
  });

  it("calls fetchAlmacenes on render", () => {
    render(
    <ChakraProvider>
      <Router>
        <Almacen />
      </Router>
    </ChakraProvider>
    );

    // Check if fetchAlmacenes was called once
    expect(datos.fetchAlmacenes).toHaveBeenCalledTimes(1);
  });
});
