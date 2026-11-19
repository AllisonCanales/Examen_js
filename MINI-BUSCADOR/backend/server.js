const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const productos = [
    { id: 1, nombre: "Laptop HP", precio: 2500, categoria: "Computadoras" },
    { id: 2, nombre: "Mouse Logitech", precio: 80, categoria: "Accesorios" },
    { id: 3, nombre: "Teclado Mecánico", precio: 150, categoria: "Accesorios" },
    { id: 4, nombre: "Monitor Samsung", precio: 900, categoria: "Monitores" },
    { id: 5, nombre: "Audífonos Sony", precio: 300, categoria: "Audio" },
    { id: 6, nombre: "Laptop Lenovo", precio: 2800, categoria: "Computadoras" }
];
app.get("/api/productos", (req, res) => {
    const busqueda = req.query.q || "";

    const resultado = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    res.json(resultado);
});
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});