
const stockInput = document.getElementById('stock');
const pagoTarjetaRadio = document.getElementById('pagoTarjeta');
const tipoCreditoRadio = document.getElementById('tipoCredito');
const bancoSelect = document.getElementById('banco');
const cuotasInput = document.getElementById('cuotas');
const entregaDeliveryRadio = document.getElementById('entregaDelivery');
const resultadoDiv = document.getElementById('resultado');

const detallesTarjetaDiv = document.getElementById('detallesTarjeta');
const detalleCuotasDiv = document.getElementById('detalleCuotas');


document.querySelectorAll('input[name="metodoPago"]').forEach(elem => {
  elem.addEventListener('change', function(event) {
    detallesTarjetaDiv.classList.toggle('hidden', event.target.value !== 'tarjeta');
  });
});

document.querySelectorAll('input[name="tipoTarjeta"]').forEach(elem => {
  elem.addEventListener('change', function(event) {
    detalleCuotasDiv.classList.toggle('hidden', event.target.value !== 'credito');
  });
});


function procesarPedido() {
  
  resultadoDiv.textContent = '';
  console.clear();

  
  const numeroElementos = parseInt(stockInput.value);
  const usandoTarjeta = pagoTarjetaRadio.checked;
  const bancoIntermediario = bancoSelect.value;
  const tarjetaDebito = !tipoCreditoRadio.checked;
  const numeroCuotas = parseInt(cuotasInput.value);
  const deliverySeleccionado = entregaDeliveryRadio.checked;

  
  console.log("▶️ Iniciando proceso de validación...");
  console.log("Connecting to database 'db_inventory_system'...");

  
  setTimeout(() => {
    console.log(`Executing query: SELECT stock FROM products WHERE id = 'PROD-001';`);
    console.log(`... Stock data received: ${numeroElementos} units.`);

    if (numeroElementos === 0) {
      log("No tenemos stock del producto seleccionado");
      console.warn("🚫 Proceso detenido: Stock insuficiente.");
    } else {
      log("Tenemos stock del producto seleccionado");
      if (usandoTarjeta) {
        log(`Usaremos el banco: ${bancoIntermediario}`);
        if (tarjetaDebito) {
          clientePaga();
          gestionarEntrega(deliverySeleccionado);
        } else {
          log(`El número de pagos a dividir la cuota: ${numeroCuotas}`);
          gestionarEntrega(deliverySeleccionado);
        }
      } else {
        log("Se llevará el producto a su hogar con pago contra entrega");
        datosEntrega();
      }
    }
  }, 800); 
}


function gestionarEntrega(delivery) {
  if (delivery) {
    datosEntrega();
  } else {
    log("El cliente decide recoger el producto en tienda");
    console.info("Finalizando proceso: Recojo en tienda seleccionado. No se requiere envío.");
  }
}

function clientePaga() {
  log("EL cliente realiza el pago");
  console.log("Connecting to payment gateway API...");

  
  setTimeout(() => {
    console.log(`Executing transaction with bank...`);
    console.log("... Payment successful.");
    console.log("Connecting to database 'db_financial_records'...");
    setTimeout(() => {
        console.log(`Executing query: INSERT INTO transactions (user_id, amount, status) VALUES ('USR-123', 150.00, 'COMPLETED');`);
        console.log("... Transaction recorded in database. ✅");
    }, 600);
  }, 1000); 
}

function datosEntrega() {
  log("--- DATOS DE ENTREGA ---");
  log("CLIENTE: MARIO BROS RED");
  log("DNI: 82917171");
  log("DIRECCION: PUEBLO CHAMPIÑON #123");
  log("RANGO DE ENTREGA 2PM - 6PM");

  console.log("Connecting to database 'db_order_management'...");
  
  setTimeout(() => {
    console.log(`Executing query: INSERT INTO orders (user_id, address, details) VALUES ('USR-123', 'PUEBLO CHAMPIÑON #123', '...');`);
    console.log("... Order created successfully. ✅");
    console.log("Connecting to database 'db_inventory_system'...");
    setTimeout(() => {
        console.log(`Executing query: UPDATE products SET stock = stock - 1 WHERE id = 'PROD-001';`);
        console.log("... Inventory updated successfully. ✅");
        console.log("🏁 Proceso de compra finalizado.");
    }, 700);
  }, 1200);
}


function log(message) {
  resultadoDiv.textContent += message + '\n';
}