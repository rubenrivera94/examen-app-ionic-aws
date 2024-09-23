import { Injectable } from '@angular/core';
import { Historial } from '../models/historial.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  // Array que almacena el historial de elementos guardados
  guardados: Historial[] = [];

  constructor(
    private storage: Storage, // Servicio de almacenamiento local
    private navCtrl: NavController, // Controlador de navegación de Ionic
    private appBrowser: InAppBrowser // Plugin para abrir un navegador externo
  ) {
    // Carga el historial desde el almacenamiento local al iniciar el servicio
    this.cargaStorage();
  }

  // Método que inicializa el almacenamiento y carga el historial desde Storage
  async cargaStorage() {
    // Crea o inicializa la base de datos de almacenamiento local
    this.storage.create();
    // Recupera los datos guardados bajo la clave 'historial' o establece un array vacío
    this.guardados = (await this.storage.get('historial')) || [];
  }

  // Método para guardar un nuevo elemento en el historial
  async guardar(format: string, text: string) {
    // Asegura que el almacenamiento esté cargado antes de guardar
    await this.cargaStorage();

    // Crea un nuevo objeto Historial con el formato y texto proporcionados
    const nuevo = new Historial(format, text);
    // Añade el nuevo historial al inicio del array
    this.guardados.unshift(nuevo);

    // Guarda el array actualizado de historial en el almacenamiento local
    this.storage.set('historial', this.guardados);

    // Llama al método abrir() para realizar una acción en función del tipo de historial
    this.abrir(nuevo);
  }

  // Método para abrir un elemento del historial según su tipo
  abrir(historial: Historial) {
    switch (historial.type) {
      case 'http':
        // Si el tipo es 'http', abre la URL en un navegador externo
        this.appBrowser.create(historial.text, '_system');
        break;

      case 'geo':
        // Si el tipo es 'geo', navega a la página del mapa con las coordenadas
        this.navCtrl.navigateForward(`/map?geo=${historial.text}`);
        break;

      default:
        // Si el tipo no es reconocido, muestra una advertencia en la consola
        console.warn('Tipo no reconocido: ', historial.type);
        break;
    }
  }

}
