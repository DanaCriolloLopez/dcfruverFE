import { TestBed } from '@angular/core/testing';

import { PedidodetalleService } from './pedidodetalle.service';

describe('PedidodetalleService', () => {
  let service: PedidodetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidodetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
