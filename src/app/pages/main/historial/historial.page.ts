import { Component, OnInit } from '@angular/core';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  // Inyección del servicio DatalocalService
  constructor(protected service: DatalocalService) { }

  // Método de ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    // Aquí se pueden realizar inicializaciones necesarias al cargar el componente
  }

  // Método que se llama para abrir un historial específico
  abrir(historial: any) {
    // Llama al método 'abrir' del DatalocalService para manejar el historial
    this.service.abrir(historial);
  }

}
