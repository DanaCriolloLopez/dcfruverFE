import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  // Creamos una variable para almacenar la lista de productos, que será una Observable de ProductoModel
  productos: Observable<ProductoModel[]> | undefined;

  // Inyectamos el servicio ProductoService en el constructor para poder usarlo en el componente
  constructor(private productoService: ProductoService) { }

  // Inicializamos la lista de productos
  ngOnInit(){
    this.productos = this.productoService.obtenerProductos();
  }

// Función para borrar un producto a través del ProductoService
  borrarProducto(idProducto: string) { 
    this.productoService.borrarProducto(idProducto).subscribe(data => { 
      console.log("Registro Eliminado");
      this.ngOnInit();
    });
  }


}
