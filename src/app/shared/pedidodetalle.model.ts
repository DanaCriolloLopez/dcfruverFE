//Modelo de PedidoDetalle
export class PedidoDetalleModel { 
    constructor(public id: string, public idpedido: string, public idproducto:string,
        public cantidad: number, public subtotal: number) { 

    }
}