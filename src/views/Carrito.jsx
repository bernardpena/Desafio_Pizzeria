import React, { useContext } from "react";
import { PizzasContext } from "../context/PizzaProvider";
import Navbar from "../components/Navbar";

import "../assets/css/carrito.css";

const Carrito = () => {
  const { pizzas, agregaCarrito, setCarrito } = useContext(PizzasContext);

  const Incremento = (pizzas) => {
    agregaCarrito(pizzas);
  };

  const Decremento = (pizzas) => {
    actualizaCantidad(pizzas.id, -1);
  };
  console.log(pizzas);

  const actualizaCantidad = (id, amount) => {
    setCarrito((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };
  const toggleErase = (id) => {
    setCarrito((prevCart) => prevCart.filter((pizzas) => pizzas.id !== id));
  };

  return (
    <>
      <Navbar />

      <table className='tablePizza'>
        <thead>
          <tr className='tr-head-footer'>
            <th width="250">Product</th>
            <th width="250">Name</th>
            <th width="250">Quantity</th>
            <th width="250">Total</th>
            <th width="250">Erase</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map(pizzas => (
            <tr className='tr-tbody' key={pizzas.id}>
              <td>
                <picture className='table-Image'>
                  <img src={pizzas.img} alt={pizzas.name} width="80" />
                </picture>
              </td>
              <td width="200">{pizzas.name}</td>
              <td className='quantity-Pizza'>
                <span>{pizzas.price * pizzas.quantity}</span>
                <span width="80" >{pizzas.quantity}</span>
                <button type="button" className="btn btn-danger" onClick={() => Decremento(pizzas)}>-</button>

                <button type="button" className="btn btn-success" onClick={() => Incremento(pizzas)}>+</button>
              </td>
              <td className='pay-each-Pizza'>$ {pizzas.quantity}</td>
              <td className='erase-container'>
                <button type="button" className="btn btn-outline-warning" onClick={() => toggleErase(pizzas.id)}>
                  <img width="24" height="24" src="https://raw.githubusercontent.com/michaelgearon/Tiny-CSS-Projects/main/chapter-08/after/img/icons/remove.svg" alt={pizzas.id} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className='footer-table'>
          <tr className='tr-head-footer'>
            <th>Total: </th>
            <td>${pizzas.reduce((total, pizzas) => total + pizzas.price * pizzas.quantity, 0)}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};


export default Carrito;
