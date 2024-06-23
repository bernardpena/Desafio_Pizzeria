import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PizzasContext } from "../context/PizzaProvider";


const Navbar = () => {

  const { pizza, total } = useContext(PizzasContext);
  const navigate = useNavigate();

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link
            to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
          </Link>
          <Link
          // to={`pizza/${pizza.id}`} className="logo-nombre mx-1 mb-0"
          // onClick={() => navigate(`/pizzas/${pizza.id}`>
            ><h4 className="mb-0">&#x1F6D2;$ {total}</h4>
          </Link>

        </div>
      </div> 
    </div>
  );
};

export default Navbar;
