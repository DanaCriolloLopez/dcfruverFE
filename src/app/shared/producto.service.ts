import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  // Definimos la URL base del servidor donde se encuentra la base de datos
  BASE_URL = 'http://localhost:3000';

  // En el constructor inyectamos el servicio HttpClient
  constructor(private http:HttpClient) {}

    // Función que obtiene los productos registrados en la base de datos
    obtenerProductos() { 
      // Realiza una solicitud HTTP GET al servidor y espera un array de objetos ProductoModel como respuesta
      return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
    }

    // Función que obtiene un producto especifico registrado en la base de datos únicamente con su ID
    obtenerProducto(idproducto: string) { 
      return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos/${idproducto}`);
    }

    // Función que agrega un producto en la base de datos
    // Recibe un objeto ProductoModel como parámetro
    agregarProducto(producto: ProductoModel) {
      return this.http.post<string>(`${this.BASE_URL}/productos`,producto);
    }

    // Función que actualiza un producto existente en la base de datos
    // Recibe un objeto ProductoModel como parámetro
    actualizarProducto(producto: ProductoModel) { 
      return this.http.put<string>(`${this.BASE_URL}/productos/${producto.idproducto}`,producto);
    }

    // Función que borra un producto de la base de datos según su ID
    // Recibe el ID del producto como parámetro
    borrarProducto(idproducto: string) { 
      return this.http.delete<string>(`${this.BASE_URL}/productos/${idproducto}`);
    }

    //Función que obtiene el stock de un producto de la base de datos según su ID
    // Recibe el ID del producto como parámetro
    stockProducto(idproducto: string) { 
      return this.http.get<string>(`${this.BASE_URL}/productoss/${idproducto}`);
    }

}
