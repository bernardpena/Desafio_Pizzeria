import { React, createContext, useEffect, useState } from "react";

//!Creación del context
export const PizzasContext = createContext();

//! Provider con la fuente de datos
const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);


  //!Obtener las pizzas
  const getPizzas = async () => {
    const res = await fetch("/pizzas.json");
    const pizzas = await res.json();
    console.log(pizzas);
    setPizzas(pizzas);
  };

  useEffect(() => {
    getPizzas()
  }, []);


  //! Funciones para el carro
  const agregaCarrito = (pizzas) => {
    setCarrito((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizzas.id);
      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizzas.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizzas, quantity: 1 }];
      }
    });
  };

  const toggleErase = (id) => {
    setCarrito((prevCart) => prevCart.filter((pizzas) => pizzas.id !== id));
  };

  const actualizaCantidad = (id, amount) => {
    setCarrito((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  const Incremento = (pizza) => {
    agregaCarrito(pizza);
  };

  const Decremento = (pizza) => {
    actualizaCantidad(pizza.id, -1);
  };




  useEffect(() => {
    getPizzas();
  }, [carrito]);

  const globalState = { pizzas, carrito, setCarrito, agregaCarrito, toggleErase, Incremento, Decremento, actualizaCantidad };

  return (
    <PizzasContext.Provider
      value={globalState}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
