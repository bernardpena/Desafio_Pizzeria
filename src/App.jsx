import { Route, Routes } from "react-router-dom";

// importar vistas
import Detalle from "./views/Detalle.jsx";
import Home from "./views/Home.jsx";
import Carrito from "./views/Carrito.jsx"
import PageNotFound from "../src/views/PageNotFound.jsx"

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="pizzas/">
          <Route path=":id" element={<Detalle />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  );
};
export default App;
