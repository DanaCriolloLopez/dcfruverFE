import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  // Definimos la URL base del servidor donde se encuentra la base de datos
  BASE_URL = 'http://localhost:3000';
  
  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

  // Función que obtiene los clientes registrados en la base de datos
  obtenerClientes() { 
    // Realiza una solicitud HTTP GET al servidor y espera un array de objetos ClienteModel como respuesta
    return this.http.get<ClienteModel[]>(`${this.BASE_URL}/clientes`);
  }

  // Función que obtiene el correo de un cliente especifico solo con su numero de cédula
  obtenerCorreo(cedulacliente: string) {
    // Realiza una solicitud HTTP GET al servidor para obtener el correo del cliente
    return this.http.get<{ correocliente: string }>(`${this.BASE_URL}/clientess/${cedulacliente}`);
  }
}
