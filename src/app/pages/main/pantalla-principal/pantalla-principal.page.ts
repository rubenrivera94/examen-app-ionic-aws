import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.page.html',
  styleUrls: ['./pantalla-principal.page.scss'],
})

export class PantallaPrincipalPage implements OnInit {

  saldo: number = 1250.75;  // Ejemplo de saldo

  historialMovimientos = [
    {
      icono: 'arrow-down-circle',
      descripcion: 'Compra en Supermercado',
      fecha: new Date(),
      monto: -35.50
    },
    {
      icono: 'arrow-up-circle',
      descripcion: 'Depósito Directo',
      fecha: new Date(),
      monto: 500.00
    },
    {
      icono: 'arrow-down-circle',
      descripcion: 'Pago de Servicios',
      fecha: new Date(),
      monto: -100.75
    },
    {
      icono: 'arrow-up-circle',
      descripcion: 'Transferencia Entrante',
      fecha: new Date(),
      monto: 200.00
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}