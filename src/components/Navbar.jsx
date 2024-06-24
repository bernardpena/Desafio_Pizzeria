import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PizzasContext } from "../context/PizzaProvider";


const Navbar = () => {
  const { carrito } = useContext(PizzasContext);
  const totalAmount = carrito.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);
  const totalItems = carrito.reduce((acc, pizza) => acc + pizza.quantity, 0);


  const navigate = useNavigate();
  console.log(carrito);

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link
            to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
          </Link>
          <Link
            to="/carrito"
            className="btn btn-info text-white">
            <h4 className="mb-0"> &#x1F6D2;$ {totalAmount.toFixed(2)}</h4>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
