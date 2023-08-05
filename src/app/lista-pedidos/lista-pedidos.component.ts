import { Component, OnInit } from '@angular/core';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoService } from '../shared/pedido.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit  {


  // Creamos una variable para almacenar la lista de pedidos, que será una Observable de PedidoModel
  pedidos: Observable<PedidoModel[]> | undefined;

  // Inyectamos el servicio PedidoService en el constructor para poder usarlo en el componente
  constructor(private pedidoService: PedidoService) { }

  // Inicializamos la lista de pedidos
  ngOnInit(){
    this.pedidos = this.pedidoService.obtenerPedidos();
  }

  //Función para obtener el texto del estado para que sea entendible para el usuario
  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'C':
        return 'Confirmado';
      case 'P':
        return 'Pendiente';
      case 'R':
        return 'Rechazado';
      default:
        return '';
    }
  }

  // Función para confirmar un pedido
  confirmarProducto(idpedido: string) {
    this.pedidoService.confirmarPedido(idpedido).subscribe(data => { 
          console.log("Pedido confirmado");
          this.ngOnInit();
        });
  }

// Función para rechazar un pedido
  rechazarProducto(idpedido: string) {
    this.pedidoService.rechazarPedido(idpedido).subscribe(data => { 
          console.log("Pedido rechazado");
          this.ngOnInit();
        });
  }
  
}
