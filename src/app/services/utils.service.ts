import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // Inyecta los servicios de control de carga, control de notificaciones tipo "toast" y el enrutador de Angular
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  //===== Crea un indicador de carga (spinner) =====
  loading() {
    // Retorna un objeto loading que muestra un spinner en forma de "crescent"
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  //===== Muestra un mensaje tipo Toast =====
  async presentToast(opts?: ToastOptions) {
    // Crea y presenta un Toast con las opciones proporcionadas
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //===== Enruta a cualquier página disponible =====
  routerLink(url: string) {
    // Redirige a una nueva ruta específica dentro de la aplicación
    return this.router.navigateByUrl(url);
  }

  //===== Guarda un elemento en LocalStorage =====
  saveInLocalStorage(key: string, value: any) {
    // Guarda un objeto en LocalStorage convirtiéndolo a JSON
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //===== Obtiene un elemento de LocalStorage =====
  getFromLocalStorage(key: string) {
    // Recupera un objeto desde LocalStorage y lo convierte de vuelta a un objeto JavaScript
    return JSON.parse(localStorage.getItem(key));
  }

}
