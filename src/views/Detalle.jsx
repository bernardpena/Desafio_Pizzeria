import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

//Context
import { PizzasContext } from "../context/PizzaProvider";

const Detalle = () => {
  const [pizzaDetail, setPizzaDetail] = useState({});
  const { pizzas, addToCart, total, totalCart } = useContext(PizzasContext);
  const { id } = useParams();

  const obtenerDatos = () => {
    const datosPizza = pizzas.find((pizza) => pizza.id === id)
    setPizzaDetail(datosPizza || {});
  };

  const toggleErase = (id) => {
    setCount((count) => {
      const { [id]: valueToDiscard, ...remainingCount } = count;
      return remainingCount;
    });
  }
  useEffect(() => {
    obtenerDatos();
  }, [pizzas]);

  return (
    // <>
    //   <Navbar />
    //   <div className="container mt-5">
    //     <div className="card mb-3 estilos">
    //       <div className="row g-0">
    //         <div className="col-md-6">
    //           <img
    //             src={pizzaDetail.img}
    //             className="img-fluid estilos rounded-start"
    //             alt={pizzaDetail.name}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <div className="card-body">
    //             <h5 className="card-title text-capitalize">
    //               {pizzaDetail.name}
    //             </h5>
    //             <p className="card-text">{pizzaDetail.desc}</p>
    //             <ul>
    //               {pizzaDetail.ingredients?.map((ingredient, i) => (
    //                 <li key={i}>&#127829; {ingredient}</li>
    //               ))}
    //             </ul>
    //             <div className="d-flex justify-content-around">
    //               <h4>Precio: ${pizzaDetail.price}</h4>
    //               <button
    //                 className="btn btn-danger"
    //                 value={count[pizzaDetail.id]?.count || 0}
    //                 onClick={() => navigate(`/pizzas/detalle${pizzaDetail.id}`)}
    //               >
    //                 Añadir &#128722;
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <table className='tablePizza'>
      <thead>
        <tr className='tr-head-footer'>
          <th>Product</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Erase</th>
        </tr>
      </thead>
      <tbody>
        {resumeData && resumeData.map(order => (
          <tr className='tr-tbody' key={order.id}>
            <td>
              <picture className='table-Image'>
                <img src={order.img} alt={order.name} />
              </picture>
            </td>
            <td>{order.name}</td>
            <td className='quantity-Pizza'>
              <input
                name={order.name}
                type="number"
                min="0"
                max="30"
                value={count[order.id]?.count || 0}
                onChange={(e) => handleQuantityChange(order.id, parseInt(e.target.value), order.price)}
              />
            </td>
            <td className='pay-each-Pizza'>$ {count[order.id]?.total || 0}</td>

            <td className='erase-container'>
              <button type="button" className="destructive" onClick={() => toggleErase(order.id)}>
                <img width="24" height="24" src="https://raw.githubusercontent.com/michaelgearon/Tiny-CSS-Projects/main/chapter-08/after/img/icons/remove.svg" alt={order.name} />
              </button>
            </td>

          </tr>
        ))}
      </tbody>

      <tfoot className='footer-table'>
        <tr className='tr-head-footer'>
          <th>Total: </th>
          <td>$ {totalPay}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Detalle;
