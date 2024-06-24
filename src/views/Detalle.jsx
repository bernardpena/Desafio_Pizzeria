import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PizzasContext } from "../context/PizzaProvider";


const Detalle = () => {
  const [pizzaDetail, setPizzaDetail] = useState({});
  const [pizza, setPizza] = useState(null)
  const [quantity, setQuantity] = useState(1);
  const { agregaCarrito } = useContext(PizzasContext);
  const { id } = useParams();

  // const obtenerDatos = () => {
  //   fetch(`${process.env.PUBLIC_URL}/pizzas.json`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const pizza = data.find(pizza => pizza.id === parseInt(id));
  //       setPizzaDetail(pizza);
  //     })
  //     .catch(error => console.error('Error en búsqueda de base:', error));
  //   // const pizzas = res.json();

  //   // setPizzas2(pizzas);
  //   // const datosPizza = pizzas.find((pizza) => pizza.id === id);
  //   // setPizzaDetail(datosPizza);
  //   // // setPizzaDetail(datosPizza || {});
  // };

  useEffect(() => {
    fetch("/pizzas.json")
      .then(response => response.json())
      .then(data => {
        const selectedPizza = data.find(pizza => pizza.id === id);
        setPizza(selectedPizza);
      })
      .catch(error => console.error('Error fetching pizza details:', error));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      agregaCarrito(pizza);
    }
  }

  if (!pizza) {
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
                src={pizza.img}
                className="img-fluid estilos rounded-start"
                alt={pizza.name}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {pizza.name}
                </h5>
                <p className="card-text">{pizza.desc}</p>
                <ul>
                  {pizza.ingredients?.map((ingredient, i) => (
                    <li key={i}>&#127829; {ingredient}</li>
                  ))}
                </ul>
                <div className="d-flex justify-content-around">
                  <h4>Precio: ${pizza.price}</h4>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={handleAddToCart}>Añadir al carrito</button>
                  {/* <button
                    className="btn btn-danger"
                    onClick={carritoUpdated}
                  // onClick={() => addToCart(pizzaDetail.id)}
                  >
                    Añadir &#128722;
                  </button> */}

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
