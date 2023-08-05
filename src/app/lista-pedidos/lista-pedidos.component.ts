import { Component, OnInit } from '@angular/core';
import { PedidoModel } from '../shared/pedido.model';
import { PedidoService } from '../shared/pedido.service';
import { Observable } from 'rxjs';
import { CorreoModel } from '../shared/correo.model';
import { ClienteService } from '../shared/cliente.service';
import { CorreoService } from '../shared/correo.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit  {


  // Creamos una variable para almacenar la lista de pedidos, que será una Observable de PedidoModel
  pedidos: Observable<PedidoModel[]> | undefined;

  // Inyectamos el servicio PedidoService en el constructor para poder usarlo en el componente
  constructor(private pedidoService: PedidoService, private clienteService: ClienteService, private correoService: CorreoService) { }

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
  confirmarPedido(idpedido: string, cedulacliente: string) {
    this.pedidoService.confirmarPedido(idpedido).subscribe(() => {
      console.log('Pedido confirmado');

      // Con la cédula del cliente obtenemos el número de cédula
      this.clienteService.obtenerCorreo(cedulacliente).subscribe(
        (response: any) => {
          const cor = response.correocliente;
          console.log(`Pedido confirmado ${cor}`);
          const correo: CorreoModel = {
            email: cor,
            asunto: `DCFruver - Confirmación de pedido`,
            mensaje: `Su pedido, con número ${idpedido}, ha sido confirmado`,
          };
          // Ya que tenemos el número de cédula  del cliente y la información del correo, lo enviamos
          this.correoService.enviarCorreo(correo).subscribe(
            () => {
              console.log('Correo enviado con éxito');
              this.ngOnInit();
            },
            (error) => {
              console.log('Error al enviar el correo:', error);
            }
          );
        },
        (error) => {
          console.log('Error al obtener el correo del cliente:', error);
        }
      );

      this.ngOnInit();
    });
  }

// Función para rechazar un pedido
  rechazarPedido(idpedido: string, cedulacliente: string) {
    this.pedidoService.rechazarPedido(idpedido).subscribe(data => { 
          console.log("Pedido rechazado");
      // Con la cédula del cliente obtenemos el número de cédula
      this.clienteService.obtenerCorreo(cedulacliente).subscribe(
        (response: any) => {
          const cor = response.correocliente;
          console.log(`Pedido confirmado ${cor}`);
          const correo: CorreoModel = {
            email: cor, 
            asunto: `DCFruver - Pedido Rechazado`,
            mensaje: `Su pedido, con número ${idpedido}, ha sido rechazado`,
          };
          // Ya que tenemos el número de cédula  del cliente y la información del correo, lo enviamos
          this.correoService.enviarCorreo(correo).subscribe(
            () => {
              console.log('Correo enviado con éxito');
              this.ngOnInit();
            },
            (error) => {
              console.log('Error al enviar el correo:', error);
            }
          );
        },
        (error) => {
          console.log('Error al obtener el correo del cliente:', error);
        }
      );

      this.ngOnInit();
      });
  }
  
}
