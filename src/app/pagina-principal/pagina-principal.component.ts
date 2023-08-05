import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../shared/producto.model';
import { Observable } from 'rxjs';
import { ProductoService } from '../shared/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CarritoComponent } from '../carrito/carrito.component'; // Importamos el componente del carrito
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoComprasService } from '../shared/carrito-compras.service';


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})

export class PaginaPrincipalComponent implements OnInit{
  // Definición de variables y propiedades
  productos: Observable<ProductoModel[]> | undefined;
  productosFiltrados: ProductoModel[] | undefined;
  categorias: string[] = [];
  rangoPrecioSeleccionado: string = 'todos';
  productoSeleccionado: ProductoModel | undefined;
  modalRef: any;
  carrito: ProductoModel[] = [];
  cantidad: number = 1;

  // Constructor del componente
  constructor(private productoService: ProductoService, private carritoService: CarritoComprasService,  private modalService: NgbModal , private router:Router) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(){
      this.productos = this.productoService.obtenerProductos();
      this.productos.subscribe((productos) => {
      this.productosFiltrados = productos;
      this.categorias = this.obtenerCategorias(productos);
    });
  }

  // Método para filtrar productos por categoría
  filtrarProductos(event: any) {
    const categoria = event.target.value;
    if (categoria === 'todas') {
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos;
      });
    } else {
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos.filter(
          (producto) => producto.categoriaproducto === categoria
        );
      });
    }
  }

 // Método para filtrar productos por rango de precios
  filtrarPorPrecio(event: any) {
    this.rangoPrecioSeleccionado = event.target.value;
    if (this.rangoPrecioSeleccionado === 'todos') {
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos;
      });
    } else {
      const [min, max] = this.rangoPrecioSeleccionado.split('-');
      const minPrecio = Number(min);
      const maxPrecio = Number(max);
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos.filter(
          (producto) => producto.precioproducto >= minPrecio && producto.precioproducto <= maxPrecio
        );
      });
    }
  }

  // Método para filtrar productos por nombre
  filtrarPorNombre(event: Event) {
    const nombre = (event.target as HTMLInputElement).value;
    if (!nombre || nombre.trim() === '') {
      // Si el campo de búsqueda está vacío o solo contiene espacios en blanco,
      // se van a mostrar todos los productos sin filtrar.
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos;
      });
    } else {
      // Filtramos los productos por nombre utilizando el método filter.
      this.productos?.subscribe((productos) => {
        this.productosFiltrados = productos.filter(
          (producto) => producto.nomproducto.toLowerCase().includes(nombre.toLowerCase())
        );
      });
    }
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(producto: any) {
    this.carrito.push(producto);
    this.carritoService.agregarProducto(producto, this.cantidad);
    this.cantidad = 1; // Reseteamos la cantidad después de agregar el producto al carrito
  }

   // Método para mostrar el modal de detalle del producto
  mostrarModal(producto: any) {
    const modalRef = this.modalService.open(ProductModalComponent, {
      ariaLabelledBy: 'productoModalLabel'
    });
    modalRef.componentInstance.productoSeleccionado = producto;
  }

  // Método privado para obtener las categorías únicas de los productos
  private obtenerCategorias(productos: ProductoModel[]): string[] {
    return [...new Set(productos.map((producto) => producto.categoriaproducto))];
  }

}