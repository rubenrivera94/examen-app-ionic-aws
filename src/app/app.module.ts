import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';  // Importa SharedModule
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

// ===== Firebase =====
import { AngularFireModule } from '@angular/fire/compat';  // Importa el módulo principal de AngularFire para Firebase
import { environment } from 'src/environments/environment.prod';  // Importa la configuración de entorno para Firebase
import { HttpClientModule } from '@angular/common/http';  // Solo importa HttpClientModule, no HttpClient directamente


@NgModule({
  declarations: [AppComponent],  // Declara los componentes principales de la app
  imports: [
    BrowserModule,  // Importa el módulo necesario para ejecutar la aplicación en el navegador
    IonicModule.forRoot({ mode: 'md' }),  // Configura Ionic en modo 'md' (Material Design)
    AppRoutingModule,  // Importa el módulo de rutas de la aplicación
    SharedModule,  // Importa el módulo compartido con componentes y servicios comunes a la app

    // ===== Inicialización de Firebase =====
    // Inicializa Firebase con la configuración del entorno de producción que contiene las claves API y otras configuraciones.
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule  // Solo HttpClientModule debe estar aquí

  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  // Provee la estrategia de reutilización de rutas de Ionic

    BarcodeScanner,  // Provee el servicio para escanear códigos de barra y QR
    Storage,  // Provee el servicio para almacenar datos en el almacenamiento local
    InAppBrowser  // Provee el servicio para abrir enlaces en el navegador dentro de la app
  ],

  bootstrap: [AppComponent],  // Especifica el componente principal que se inicializa al arrancar la aplicación
})
export class AppModule { }
