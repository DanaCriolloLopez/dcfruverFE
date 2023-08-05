import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  @Input() productoSeleccionado: any;

  constructor(public activeModal: NgbActiveModal) {}
  
  //Función que cierra el Modal 
  dismissModal() {
    this.activeModal.dismiss();
  }
}
