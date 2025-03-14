import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Almacen from "./Almacen";
import * as datos from "../../datos/almacenes"; // Import mock
import { vi } from 'vitest';
import { ChakraProvider } from "@chakra-ui/react";

// Mocking fetchAlmacenes function
vi.mock("../../datos/almacenes", () => ({
  fetchAlmacenes: vi.fn().mockResolvedValue([
    {
      id: 62,
      empresa: 1,
      laboratorio: "ksdkksdds",
      almacen: "sd"
    }
  ]),
  fetchAlmacenById: vi.fn().mockResolvedValue({ id: 2, almacen: 'Almacen 2', laboratorio: "lab2" }),
  addAlmacen: vi.fn(),
  updateAlmacen: vi.fn(),
  deleteAlmacen: vi.fn()
}));

// Utility function to render the component
const renderAlmacen = () => {
  return render(
    <ChakraProvider>
      <Router>
        <Almacen />
      </Router>
    </ChakraProvider>
  );
};

describe("Almacen Component", () => {
  beforeEach(() => {
    datos.fetchAlmacenes.mockReset();
    datos.deleteAlmacen.mockReset();
  });

  it("calls fetchAlmacenes on render", async () => {
    renderAlmacen();

    // Check if fetchAlmacenes was called once
    expect(datos.fetchAlmacenes).toHaveBeenCalledTimes(1);
  });

  it("navigates to add new almacen page when 'Añadir' button is clicked", () => {
    renderAlmacen();

    // Simulate click on the 'Añadir' button
    fireEvent.click(screen.getByRole('button', { name: /Añadir/i }));

    // Check if it navigated to the add page
    expect(window.location.pathname).toBe('/Almacen/add');
  });
});
