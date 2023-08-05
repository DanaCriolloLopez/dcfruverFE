import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // Variable para indicar si las credenciales son válidas
  private ingresar:boolean = false;

  // Método constructor
  constructor(public usuarioService: UsuarioService) { }

  // Método para intentar el inicio de sesión con las credenciales proporcionadas
  public ingresarAplicativo(obj:any):boolean{

  // En el lugar donde desees obtener los valores
    this.usuarioService.obtenerCredenciales().subscribe(
      (usuarios: UsuarioModel[]) => {
        if (usuarios.length > 0) {
          // Obtenemos el primer registro del arreglo que corresponde a las credenciales del admin de la tienda
          const primerUsuario = usuarios[0]; 
          const nombreusu = primerUsuario.nombreusu;
          const contrasenausu = primerUsuario.contrasenausu;
          console.log('Nombre de usuario:', nombreusu);
          console.log('Contraseña:', contrasenausu);
          console.log(obj.usuario);
          console.log(obj.password);
          console.log(this.ingresar);
          this.ingresar = obj.usuario == nombreusu && obj.password==contrasenausu;
        } else {
          console.error('No se encontraron usuarios en la respuesta.');
        }
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );// Devuelve true si las credenciales son válidas, false si no lo son.
    return this.ingresar;

  }

  // Método para habilitar el inicio de sesión
  public habilitarlogeo(){
    return this.ingresar;
  }
}
