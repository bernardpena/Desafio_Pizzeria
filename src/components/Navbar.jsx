import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link
            to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
