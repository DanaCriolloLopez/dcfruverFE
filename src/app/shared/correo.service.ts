import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorreoModel } from './correo.model';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  // Definimos la URL base del servidor donde se encuentra el servicio de enviar el correo 
  BASE_URL = 'http://localhost:3000';

  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

  //Función envía una solicitud HTTP POST al servidor para enviar un correo electrónico
  enviarCorreo(correo: CorreoModel) { 
    return this.http.post<{ req: String }>(`${this.BASE_URL}/envio`, correo);
  }
}
