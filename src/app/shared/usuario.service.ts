import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  // Definimos la URL base del servidor donde se encuentra la base de datos
  BASE_URL = 'http://localhost:3000';
  
  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

    // Función que obtiene las credenciales de los usuarios registrado en la base de datos
    obtenerCredenciales() { 
      // Realiza una solicitud HTTP GET al servidor y espera un array de objetos UsuarioModel como respuesta
      return this.http.get<UsuarioModel[]>(`${this.BASE_URL}/usuario`);
    }

}
