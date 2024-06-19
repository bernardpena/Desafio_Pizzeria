import { createContext, useEffect, useState } from "react";

// Creación del context
export const PizzasContext = createContext();

// Provider con la fuente de datos
const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    getPizzas();
  }, []);

  // Obtener las pizzas
  const getPizzas = async () => {
    const res = await fetch("/pizzas.json");
    const pizzas = await res.json();
    setPizzas(pizzas);
  };

  // Funciones para el carro

  return (
    <PizzasContext.Provider
      value={{ pizzas, setPizzas }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
