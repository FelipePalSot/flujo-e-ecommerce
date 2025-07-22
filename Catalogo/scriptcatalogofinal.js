
const catalogoProductos = {
        "arreglo":[
    {
        id:6,
        id_categoria:3,
        categoria: "Electronica",
        nombre: "Laptop Lenovo",
        precio: 2500,
        stock: 5
    },
    {
        id:7,
        id_categoria:3,
        categoria: "Electronica",
        nombre: "Smartphone Samsung",
        precio: 1200,
        stock: 3
    },
    {
        id:4,
        id_categoria:2,
        categoria: "Ropa",
        nombre: "Casaca de cuero",
        precio: 180,
        stock: 2
    },
    {
        id:1,
        id_categoria:1,
        categoria: "Hogar",
        nombre: "Licuadora Oster",
        precio: 300,
        stock: 10
    },
    {
        id:10,
        id_categoria:2,
        categoria: "Ropa",
        nombre: "Pantalon Jeans",
        precio: 90,
        stock: 0
    },
    {
        id:2,
        id_categoria:1,
        categoria: "Hogar",
        nombre: "Olla arrocera",
        precio: 50,
        stock: 9
    },
    {
        id:3,
        id_categoria:1,
        categoria: "Hogar",
        nombre: "Lavadora",
        precio: 580,
        stock: 15
    },
    {
        id:5,
        id_categoria:2,
        categoria: "Ropa",
        nombre: "camisa manga larga",
        precio: 150,
        stock: 8
    },
        {
        id:8,
        id_categoria:3,
        categoria: "Electronica",
        nombre: "Tablet",
        precio: 999,
        stock: 5
    },
    {
        id:9,
        id_categoria:2,
        categoria: "Ropa",
        nombre: "Bermuda",
        precio: 80,
        stock: 0
    },
]};

console.log(catalogoProductos.arreglo)

    function fnObtieneDatos(arreglo){
            let impresion="";

            for(let item of arreglo){
                console.log(item.id+") "+item.nombre+"/"+item.id_categoria+
                            " ("+item.categoria+")= "+item.precio);
                impresion=impresion+"<div>"+item.id+") "+item.nombre+"/"+item.id_categoria+
                            " ("+item.categoria+")= "+item.precio+
                            "<button onClick='fnEliminar("+item.id+")'>ELIMINAR</button></div>";
            }
            return impresion;
    }

document.getElementById("lista2").innerHTML= fnObtieneDatos(catalogoProductos.arreglo);

    function fnEliminar(idEliminar){
        console.log(idEliminar);
        let sqlDelete= "delete from proyecto.productos "+
                        "where id="+idEliminar+";"
        console.log(sqlDelete);
    }

    function fnGuardar(){
        let nombre=document.getElementById("nombre").value;
        let id_categoria=document.getElementById("id_categoria").value;
        let categoria=document.getElementById("categoria").value;
        let precio=document.getElementById("precio").value;
        let stock=document.getElementById("stock").value;
    
        console.log(nombre+"/"+id_categoria+" ("+categoria+") "+stock+ "= "+precio);
        let sqlInsert= "insert into proyecto.productos(nombre, precio, stock, id_categoria)" +
                        "values('"+nombre+"', "+precio+", "+stock+","+id_categoria+");"
                                
        console.log(sqlInsert)
    }


    let carrito = [];

    function filtrarPorCategoria() {
        const categoriaInput = document.getElementById("filtroCategoria").value.toLowerCase();
        const resultado = document.getElementById("resultadoFiltro");
        resultado.innerHTML = ""; // Limpiar resultados anteriores
        
        let sql = "SELECT p.id, p.nombre, p.precio, p.stock, c.nombre as categoria " +
                  "FROM proyecto.productos p " +
                  "JOIN categoria c ON p.id_categoria = c.id " +
                  "WHERE LOWER(c.nombre) = '" + categoriaInput + "';";
        console.log(sql);
       
        const productosFiltrados = catalogoProductos.arreglo.filter(p =>
            p.categoria.toLowerCase() === categoriaInput
        );

        if (productosFiltrados.length === 0) {
            resultado.innerHTML = "<p>No se encontraron productos.</p>";
        } else {
            for (let producto of productosFiltrados) {
                let div = document.createElement("div");
                div.innerHTML = `${producto.nombre} - S/${producto.precio} - Stock: ${producto.stock} 
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
                resultado.appendChild(div);
            }
        }
    }

    function agregarAlCarrito(idProducto) {
        const producto = catalogoProductos.arreglo.find(p => p.id === idProducto);
        if (producto.stock > 0) {
            carrito.push(producto);
            alert(`${producto.nombre} agregado al carrito.`);
            mostrarCarrito();
        } else {
            alert(`${producto.nombre} no tiene stock.`);
        }
    }

function mostrarCarrito() {
        const divCarrito = document.getElementById("carrito");
        divCarrito.innerHTML = "";
        for (let p of carrito) {
            let div = document.createElement("div");
            div.innerText = `${p.nombre} - S/${p.precio}`;
            divCarrito.appendChild(div);
        }

        let boton = document.createElement("button");
        boton.innerText = "Confirmar Pedido";
        boton.onclick = confirmarPedido;
        divCarrito.appendChild(boton);
    }

function confirmarPedido() {
    const id_usuario = 1; // Puedes modificarlo según el usuario activo
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
    let totalPedido = 0;

    for (let p of carrito) {
        totalPedido += p.precio;  // Asumimos cantidad 1 por producto
    }

    let sqlPedido = `INSERT INTO proyecto.pedidos(id_usuario, fecha, total_pedido) VALUES (${id_usuario}, '${fecha}', ${totalPedido});`;
    
    console.log(sqlPedido);

    // Supongamos que el nuevo pedido tendrá ID 99 (ejemplo)
    const idPedido = 99;

    for (let p of carrito) {
        let sqlDetalle = `INSERT INTO proyecto.detalle_pedido(id_pedido, id_producto, cantidad, total) VALUES (${idPedido}, ${p.id}, 1, ${p.precio});`;
        console.log(sqlDetalle);
    }

}
