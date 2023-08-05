import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { ProductoService } from './shared/producto.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { UsuarioService } from './shared/usuario.service';
import { ClienteService } from './shared/cliente.service';
import { PedidoService } from './shared/pedido.service';
import { PedidodetalleService } from './shared/pedidodetalle.service';
import { CarritoComponent } from './carrito/carrito.component';
import { CarritoComprasService } from './shared/carrito-compras.service';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { CorreoService } from './shared/correo.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    ProductModalComponent,
    CarritoComponent,
    ListaProductosComponent,
    EditarProductosComponent,
    ListaPedidosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductoService,
    UsuarioService,
    ClienteService,
    PedidoService,
    PedidodetalleService,
    CarritoComprasService,
    CorreoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
