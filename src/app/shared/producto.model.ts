//Modelo para Producto
export class ProductoModel { 
    constructor(public idproducto: string, public nomproducto: string, public categoriaproducto:string,
        public descripcionproducto: string, public precioproducto: number, public stockproducto: number,
        public imgproducto: string ) { 

    }
}