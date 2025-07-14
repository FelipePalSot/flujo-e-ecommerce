// Catálogo con productos de distintas categorias
const catalogoProductos = [
    {
        categoria: "Electronica",
        nombre: "Laptop Lenovo",
        precio: 2500,
        stock: 5
    },
    {
        categoria: "Electronica",
        nombre: "Smartphone Samsung",
        precio: 1200,
        stock: 3
    },
    {
        categoria: "Ropa",
        nombre: "Casaca de cuero",
        precio: 180,
        stock: 2
    },
    {
        categoria: "Hogar",
        nombre: "Licuadora Oster",
        precio: 300,
        stock: 10
    },
    {
        categoria: "Ropa",
        nombre: "Pantalon Jeans",
        precio: 90,
        stock: 0
    },
    {
        categoria: "Hogar",
        nombre: "Olla arrocera",
        precio: 50,
        stock: 9
    },
    {
        categoria: "Hogar",
        nombre: "Lavadora",
        precio: 580,
        stock: 15
    },
    {
        categoria: "Ropa",
        nombre: "camisa manga larga",
        precio: 150,
        stock: 8
    },
        {
        categoria: "Electronica",
        nombre: "Tablet",
        precio: 999,
        stock: 5
    },
    {
        categoria: "Ropa",
        nombre: "Bermuda",
        precio: 80,
        stock: 0
    },
];

//Función de busqueda por categoria

function filtrarPorCategoria(categoriaBuscar) {
    let encontrados = [];

    for (let i = 0; i < catalogoProductos.length; i++) {
        let producto = catalogoProductos[i];

        if (producto.categoria.toLowerCase() === categoriaBuscar.toLowerCase()) {
            encontrados.push(producto);
        }
    }
    
    if (encontrados.length > 0) {
        console.log("Productos encontrados en la categoria " +categoriaBuscar + ":");
        console.log(encontrados);
    } else {
        console.log("No se encontraron productos en la categoria " +categoriaBuscar+ ".");
    }

    return encontrados;
}

// Prueba
filtrarPorCategoria("hogar");

// Verificar producto

function verificarStock(producto) {
    if (producto.stock > 0) {
        console.log(producto.nombre + " está disponible" + producto.stock + "unidades.");
        return true;
    } else {
        console.log(producto.nombre + " no tiene stock. Buscando productos similares...");
        mostrarSimilares(producto.categoria);
        return false;
    }
}

function mostrarSimilares(categoria) {
    let similares = [];

    for (let i = 0; i < catalogoProductos.length; i++) {
        let producto = catalogoProductos[i];

        if (producto.categoria === categoria && producto.stock > 0) {
            similares.push(producto);
        }
    }

    if (similares.length > 0) {
        console.log("Productos similares disponibles:");
        console.log(similares);
    } else {
        console.log("No hay productos similares disponibles en esta categoria.");
    }
}

// Prueba con un producto sin stock
verificarStock(catalogoProductos[4]); // Pantalon jeans

// Agregar al carrito

let carrito = [];

function agregarAlCarrito(producto) {
    if (producto.stock > 0) {
        carrito.push(producto);
        console.log(producto.nombre + " agregado al carrito.");
    } else {
        console.log("No se puede agregar " + producto.nombre + " al carrito: sin stock.");
    }
}

// Prueba
agregarAlCarrito(catalogoProductos[0]); // Laptop
console.log("Carrito actual:", carrito);
