import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  //Rutas que redirigen a mi página principal 
  { path: 'principal', component: PaginaPrincipalComponent },
  //Ruta que dirige al carrito de compras 
  { path: 'carrito', component: CarritoComponent},
  //Rutas que dirigen a las accciones con el producto 
  { path: 'productos', component: ListaProductosComponent},
  { path: 'productos/editar/:idproducto', component: EditarProductosComponent},
  { path: 'productos/agregar', component: EditarProductosComponent},
  //Ruta para listar pedidos
  { path: 'pedidos', component: ListaPedidosComponent},
  //Ruta Login
  { path: 'inicio', component: LoginComponent},
  //Cualquier otra ruta que pongan se va a redirigir a mi página principal
  { path: '**', redirectTo:'/principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
