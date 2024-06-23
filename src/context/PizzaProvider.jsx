import { React, createContext, useEffect, useState } from "react";

//!Creación del context
export const PizzasContext = createContext({
  pizzas: [],
  carrito: [],
  setCarrito: () => { },
  total: 0,
  priceToCurrency: () => { }
});

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
  const priceToCurrency = (value) => {
    const priceToStr = value.toLocaleString("en");
    return priceToStr.replace(',', '.');
  }

  const addToCar = (id) => {
    const pizzaFinded = pizzas.find(pizzaOriginal => pizzaOriginal.id === id);
    const pizzaIndex = carrito.findIndex(pizza => pizza.id === pizzaFinded.id);
    const pizzaAdded = {
      id: pizzaFinded.id,
      price: pizzaFinded.price,
      quantity: 1
    };
    if (pizzaIndex !== -1) {
      const carritoUpdated = [...carrito];
      carritoUpdated[pizzaIndex].quantity += 1;
      setCarrito(carritoUpdated);

    } else {
      setCarrito([...carrito, pizzaAdded]);
    }
  }

  const PizzasTotal = () => {
    let total = 0;
    carrito.forEach(pizza => {
      total += pizza.quantity;
    });
    setTotal(total);
  }

  const pizzasSubTotal = (id) => {
    let subtotal = 0;
    const pizzaIndex = carrito.findIndex(pizza => pizza.id === id)
    subtotal = carrito[pizzaIndex].quantity * carrito[pizzaIndex].price
    return subtotal;
  }

  const totalCart = () => {
    let total = 0;
    carrito.forEach(pizza => {
      total += (pizza.quantity * pizza.price);
    });
    return total;
  }

  const removeFromCart = (id) => {
    const pizzaIndex = carrito.findIndex(pizza => pizza.id === id);
    if (pizzaIndex !== -1 && carrito[pizzaIndex].quantity > 1) {
      const carritoUpdated = [...carrito];
      carritoUpdated[pizzaIndex].quantity -= 1;
      setCarrito(carritoUpdated);
    } else if (pizzaIndex !== -1 && carrito[pizzaIndex].quantity === 1) {
      setCarrito(carrito.filter((pizza) => pizza.id !== id))
    }
  }

  const cleanCart = () => {
    setCarrito([]);
  }

  useEffect(() => {
    getPizzas();
  }, [carrito]);

  const globalState = { pizzas, carrito, setCarrito, total, priceToCurrency, addToCar, PizzasTotal, pizzasSubTotal, totalCart, removeFromCart, cleanCart };

  return (
    <PizzasContext.Provider
      value={globalState}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
