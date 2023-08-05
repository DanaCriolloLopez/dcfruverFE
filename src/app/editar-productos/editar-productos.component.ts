import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  // Declaramos variables para inicialaizar el id del producto y los datos del producto
  idproducto = '';
  producto = new ProductoModel("", "", "","", 0, 0, "");

  // Inyectamos los servicios ActivatedRoute, Router y ProductoService en el constructor
  constructor(private productoService: ProductoService,private route: ActivatedRoute, private router: Router) { }

  //Inicializamos los datos del producto, únicamente si se edita un producto se llena los datos de este en el formulario
  ngOnInit() {
    this.idproducto = this.route.snapshot.params['idproducto'];
    console.log("El id de Producto es :" + this.idproducto);
    
    if (this.idproducto) { 
      //Editar
      this.productoService.obtenerProducto(this.idproducto).subscribe(data => {
        this.producto = data[0];
      }, error => {
        console.log(error);
      });
    }
    else {
      //Nuevo Producto
      console.log('Nuevo Producto');
      
    }
  }

  // Función para manejar el evento onSubmit del formulario
  onSubmit() { 
    console.log("Submit realizado");
    if (this.producto.idproducto) {
      //Viene de Editar
      this.productoService.actualizarProducto(this.producto).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/productos']);
        }
      );
    }
    else { 
      //Viene de crear Nuevo Producto
      console.log('Nuevo Producto');
      this.productoService.agregarProducto(this.producto).subscribe(data => { 
        this.router.navigate(['/productos']);
      });
    }

  }
}
