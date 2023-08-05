import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDetalleModel } from './pedidodetalle.model';

@Injectable({
  providedIn: 'root'
})
export class PedidodetalleService {
  
  // Definimos la URL base del servidor donde se encuentra la base de datos
  BASE_URL = 'http://localhost:3000';

  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

    // Función que obtiene los detalles de un pedido especifico registrados en la base de datos
    obtenerPedidoDetalle(idpedido: string) { 
      // Realiza una solicitud HTTP GET al servidor y espera un array de objetos PedidoDetalleModel como respuesta
      return this.http.get<PedidoDetalleModel[]>(`${this.BASE_URL}/pedidodetalle/${idpedido}`);
    }

    // Función que agrega un detalle a un pedido en la base de datos
    // Recibe un objeto PedidoDetalleModel como parámetro
    agregarProducto(pedido: PedidoDetalleModel) {
      return this.http.post<string>(`${this.BASE_URL}/pedidodetalle`,pedido);
    }

    // Función que actualiza la información de los detalles de un pedido existente en la base de datos
    // Recibe un objeto PedidoDetalleModel como parámetro
    actualizarProducto(pedido: PedidoDetalleModel) { 
      return this.http.put<string>(`${this.BASE_URL}/pedidos/${pedido.id}`,pedido);
    }

    // Función que borra un detalle de un pedido de la base de datos según su ID
    // Recibe el ID del producto como parámetro
    borrarProducto(id: string) { 
      return this.http.delete<string>(`${this.BASE_URL}/productos/${id}`);
    }
}
