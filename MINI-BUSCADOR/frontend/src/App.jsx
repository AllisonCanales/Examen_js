import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`/api/productos?q=${encodeURIComponent(busqueda)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al conectar con el servidor");
        }
        return response.json();
      })
      .then(data => {
        setProductos(data);
        setError("");
      })
      .catch(error => {
        console.error("Error:", error);
        setError("No se pudo conectar con el servidor.");
      });

  }, [busqueda]);

  return (
    <div className="contenedor">

      <h1>Buscador de productos</h1>

      <input
        type="text"
        placeholder="Buscar un producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <h2>Resultados de búsqueda</h2>

      {error ? (

        <p>{error}</p>

      ) : (

        <div className="productos">

          {productos.length > 0 ? (

            productos.map(producto => (

              <div className="producto" key={producto.id}>

                <h3>{producto.nombre}</h3>

                <p>Precio: S/ {producto.precio}</p>

                <p>Categoría: {producto.categoria}</p>

              </div>

            ))

          ) : (

            <p>No se encontraron productos.</p>

          )}

        </div>

      )}

    </div>
  );
}

export default App;