import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  // Inyección de dependencias: el BarcodeScanner y el DatalocalService
  constructor(private scanner: BarcodeScanner, private service: DatalocalService) { }

  ngOnInit() {
    // Método de ciclo de vida que se ejecuta al inicializar el componente
  }

  // Método que se activa al realizar un escaneo
  scan() {
    this.scanner.scan().then(data => { // Inicia el escaneo con BarcodeScanner
      if (!data.cancelled) { // Verifica si el escaneo no fue cancelado por el usuario
        const text = data.text; // Obtiene el texto del código escaneado

        // Identifica si el texto es una URL o coordenadas geográficas (geo)
        if (text.startsWith('http')) {
          this.service.guardar('http', text); // Guarda como una URL en el historial
        } else if (text.startsWith('geo:')) {
          this.service.guardar('geo', text); // Guarda como coordenadas de geolocalización
        } else {
          this.service.guardar('unknown', text); // Guarda como un tipo de dato desconocido
        }
      }
    }).catch(err => {
      console.error('Error scanning: ', err); // Manejo de errores si falla el escaneo
      // En caso de error, guarda una geolocalización predeterminada
      this.service.guardar('QRCode', 'geo:-33.4650377,-70.6366242');
    });
  }

}
