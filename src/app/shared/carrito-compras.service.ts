import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  
  // Lista privada de productos en el carrito con sus cantidades
  private carrito: { producto: ProductoModel, cantidad: number }[] = [];

  // Método para agregar un producto al carrito
  agregarProducto(producto: any, cantidad: number) {

    // Buscamos si el producto ya está en el carrito
    const productoEnCarrito = this.carrito.find(item => item.producto.idproducto === producto.idproducto);

    // Si el producto ya está en el carrito, aumentamos la cantidad
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      // Si el producto no está en el carrito, lo agregamos
      this.carrito.push({ producto, cantidad });
    }
  }

  // Método para obtener el carrito completo
  obtenerCarrito() {
    return this.carrito;
  }

  // Método para calcular el total del carrito
  calcularTotal(): number {
    let total = 0;
    for (const item of this.carrito) {
      total += item.producto.precioproducto * item.cantidad;
    }
    return total;
  }

  // Método para limpiar el carrito
  limpiarCarrito(): void {
    this.carrito = [];
  }
}
