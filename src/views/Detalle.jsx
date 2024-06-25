import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PizzasContext } from "../context/PizzaProvider";


const Detalle = () => {
  const [pizzas, setPizza] = useState(null)
  const [quantity, setQuantity] = useState(1);
  const { agregaCarrito } = useContext(PizzasContext);
  const { id } = useParams();

  useEffect(() => {
    fetch("/pizzas.json")
      .then(response => response.json())
      .then(data => {
        const selectedPizza = data.find(pizzas => pizzas.id === id);
        setPizza(selectedPizza);
      })
      .catch(error => console.error('Error fetching pizza details:', error));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      agregaCarrito(pizzas);
    }
  }

  if (!pizzas) {
    return <div>Cargando Pagina...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-3 estilos">
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src={pizzas.img}
                className="img-fluid estilos rounded-start"
                alt={pizzas.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {pizzas.name}
                </h5>
                <p className="card-text">{pizzas.desc}</p>
                <ul>
                  {pizzas.ingredients?.map((ingredient, i) => (
                    <li key={i}>&#127829; {ingredient}</li>
                  ))}
                </ul>
                <div className="d-flex justify-content-around">
                  <h4>Precio: ${pizzas.price}</h4>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={handleAddToCart}>Añadir al carrito</button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalle;
