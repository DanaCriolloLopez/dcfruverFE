import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoModel } from './pedido.model';
import { mergeMap } from 'rxjs/operators';
import { PedidoDetalleModel } from './pedidodetalle.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // Definimos la URL base del servidor donde se encuentra la base de datos
  BASE_URL = 'http://localhost:3000';

  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

  // Función que obtiene los pedidos pendientes registrados en la base de datos
  obtenerPedidosPendientes() { 
    // Realiza una solicitud HTTP GET al servidor y espera un array de objetos PedidoModel como respuesta
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidoss`);
  }

  // Función que agrega los pedidos pendientes registrados en la base de datos
  agregarPedidosPendientes(pedido: PedidoModel) { 
    // Realiza una solicitud HTTP Post al servidor y espera un  objeto PedidoModel como respuesta
    return this.http.post<{ newpedido: PedidoModel }>(`${this.BASE_URL}/pedidos`, pedido);
  }

  // Función que obtiene todos los pedidos registrados en la base de datos sin importar su estado
  obtenerPedidos() { 
    // Realiza una solicitud HTTP GET al servidor y espera un array de objetos PedidoModel como respuesta
    return this.http.get<PedidoModel[]>(`${this.BASE_URL}/pedidos`);
  }

  // Función que confirma un pedido registrado en la base de datos únicamente con su Id 
  confirmarPedido(idpedido: string) { 
    return this.http.get<string>(`${this.BASE_URL}/pedidoss/${idpedido}`);
  }

  // Función que rechaza un pedido registrado en la base de datos  únicamente con su ID
  rechazarPedido(idpedido: string) { 
    return this.http.get<string>(`${this.BASE_URL}/pedidosss/${idpedido}`);
  }
  
}
