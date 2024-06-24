import React, { useContext } from "react";
import Navbar from "../components/Navbar";

import "../assets/css/carrito.css";

//Context
import { PizzasContext } from "../context/PizzaProvider";

const Detalle = () => {
  const { pizzas, agregaCarrito, toggleErase, actualizaCantidad } = useContext(PizzasContext);

  const Incremento = (pizza) => {
    agregaCarrito(pizza);
  };

  const Decremento = (pizza) => {
    actualizaCantidad(pizza.id, -1);
  };

  return (

    <>
      <Navbar />
      {/* <div>
        <h1>Detalles del pedido:</h1>
        <div className="cart-list">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="cart-item">
              <img src={pizza.img} alt={pizza.name} width="50" />
              <h4>{pizza.name}</h4>
              <p>Ingredientes: {pizza.ingredients.join(', ')}</p>
              <span>${pizza.price * pizza.quantity}</span>
              <div className="quantity-controls">
                <button onClick={() => Decremento(pizza)}>-</button>
                <span>{pizza.quantity}</span>
                <button onClick={() => Incremento(pizza)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <h2>Total: ${pizzas.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0)}</h2>
        <button className="checkout-button">Ir a Pagar</button>
      </div> */}
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
          {pizzas.map(pizza => (
            <tr className='tr-tbody' key={pizza.id}>
              <td>
                <picture className='table-Image'>
                  <img src={pizza.img} alt={pizza.name} />
                </picture>
              </td>
              <td width="200">{pizza.name}</td>
              <td className='quantity-Pizza'>
                <button type="button" className="btn btn-danger" onClick={() => Decremento(pizza)}>-</button>
                <span>{pizza.quantity}</span>
                <button type="button" className="btn btn-success" onClick={() => Incremento(pizza)}>+</button>
              </td>
              {/* <td className='pay-each-Pizza'>$ {count[order.id]?.total || 0}</td> */}
              <td className='erase-container'>
                <button type="button" className="btn btn-outline-warning" onClick={() => toggleErase(pizza.id)}>
                  <img width="24" height="24" src="https://raw.githubusercontent.com/michaelgearon/Tiny-CSS-Projects/main/chapter-08/after/img/icons/remove.svg" alt={pizza.id} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className='footer-table'>
          <tr className='tr-head-footer'>
            <th>Total: </th>
            <td>${pizzas.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0)}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Detalle;
