//Modelo del pedido
export class PedidoModel { 
    constructor(public idpedido: string, public cedulacliente: string, public fechapedido:string,
        public total: number, public estado: string) { 

    }
}