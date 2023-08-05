import { Component, Input } from '@angular/core';
import { CarritoComprasService } from '../shared/carrito-compras.service';
import { ClienteModel } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';
import { PedidoService } from '../shared/pedido.service';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoDetalleModel } from '../shared/pedidodetalle.model';
import { PedidodetalleService } from '../shared/pedidodetalle.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {
  // Definición de variables 
  carrito: { producto: any, cantidad: number }[] = [];
  clientes: ClienteModel[] = [];
  clienteSeleccionado: ClienteModel | null = null;

  // Constructor del componente
  constructor(private carritoService: CarritoComprasService, private clienteService: ClienteService,  private pedidoService: PedidoService, private pedidoDetalleService: PedidodetalleService) {
    this.carrito = this.carritoService.obtenerCarrito();
    this.obtenerClientes();
  }

  // Método para obtener la lista de clientes desde el servicio
  obtenerClientes() {
    // HAcemos uso del ClienteService para obtener los clientes
    this.clienteService.obtenerClientes().subscribe(
      (clientes) => {
        // Al recibir la lista de clientes, la almacenamos en la variable local
        this.clientes = clientes;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  // Método para seleccionar un cliente para el pedido
  seleccionarCliente(cliente: ClienteModel) {
    this.clienteSeleccionado = cliente;
  }

  // Método para actualizar el subtotal de un item en el carrito
  actualizarSubtotal(item: any): void {
    item.subtotal = item.cantidad * item.producto.precioproducto;
  }

   // Método para eliminar un producto del carrito
  eliminarProducto(item: any): void {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito.splice(index, 1);
    }
  }

  // Método para realizar el pedido
  hacerPedido(): void {
    if (this.clienteSeleccionado && this.carrito.length > 0) {
      // Creamos el pedido y obtenemos su ID
      const pedido: PedidoModel = {
        idpedido: '', // El servidor asignará el ID
        cedulacliente: this.clienteSeleccionado.cedulacliente,
        fechapedido: new Date().toISOString(),
        total: this.calcularTotal(),
        estado: 'P' // Pendiente
      };

      // Llamamos al PedidoService para agregar el pedido a la bd y obtener el ID generado
      this.pedidoService.agregarPedidosPendientes(pedido).subscribe(
        (response: any) => {
          const idp = response.newpedido.idpedido;
          alert(`Pedido realizado con éxito. ID del pedido: ${idp}`);

          // Por cada item en el carrito, agregamos el detalle del pedido
          this.carrito.forEach(item => {
            const pedidoDetalle: PedidoDetalleModel = {
              id: '', // El servidor asignará el ID
              idpedido: idp,
              idproducto: item.producto.idproducto, 
              cantidad: item.cantidad,
              subtotal: item.cantidad * item.producto.precioproducto
            };

            // Llamamos al PedidodetalleService para agregar el detalle del pedido
            this.pedidoDetalleService.agregarProducto(pedidoDetalle).subscribe(
              () => {
                console.log('Pedido agregado con éxito')
              },
              error => {
                console.error('Error al agregar detalle de pedido:', error);
              }
            );
          });

          // Luego de agregar todos los detalles, podemos limpiar el carrito o realizar otras acciones.
          this.carritoService.limpiarCarrito();
          this.carrito = [];
          this.clienteSeleccionado = null;
        },
        error => {
          console.error('Error al hacer el pedido:', error);
        }
      );
    } else {
      alert('Debe seleccionar un cliente y tener al menos un producto en el carrito.');
    }
  }

  // Método para calcular el total del carrito
  calcularTotal(): number {
    return this.carritoService.calcularTotal();
  }
}
