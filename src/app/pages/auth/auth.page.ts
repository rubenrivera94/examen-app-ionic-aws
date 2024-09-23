import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';  // Importa el modelo de usuario para tipado
import { FirebaseService } from 'src/app/services/firebase.service';  // Importa el servicio de Firebase
import { UtilsService } from 'src/app/services/utils.service';  // Importa el servicio de utilidades

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // Define el formulario de autenticación con controles de email y contraseña
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  // Inyecta servicios de Firebase y utilidades
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  constructor() { }

  ngOnInit() {
    // Método de ciclo de vida de Angular llamado al inicializar el componente
  }

  // Método que se ejecuta al enviar el formulario
  async submit() {
    if (this.form.valid) {  // Verifica si el formulario es válido

      const loading = await this.utilsService.loading();  // Muestra un indicador de carga
      await loading.present();

      // Llama al método de autenticación en firebaseService
      this.firebaseService.signIn(this.form.value as User).then(res => {

        // Si la autenticación es exitosa, obtiene la información del usuario
        this.getUserInfo(res.user.uid);

      }).catch(error => {  // Maneja errores de autenticación
        console.log(error);

        this.utilsService.presentToast({  // Muestra un mensaje de error
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();  // Cierra el indicador de carga
      })
    }
  }

  // Método para obtener la información del usuario desde Firestore
  async getUserInfo(uid: string) {
    if (this.form.valid) {  // Verifica si el formulario es válido

      const loading = await this.utilsService.loading();  // Muestra un indicador de carga
      await loading.present();

      let path = `users/${uid}`  // Define la ruta al documento del usuario en Firestore

      // Llama al método para obtener el documento en firebaseService
      this.firebaseService.getDocument(path).then((user: User) => {

        // Guarda la información del usuario en LocalStorage
        this.utilsService.saveInLocalStorage('user', user);

        // Redirige al usuario a la página de escaneo
        this.utilsService.routerLink('/main/pantalla-principal');
        this.form.reset();  // Resetea el formulario

        // Muestra un mensaje de bienvenida al usuario
        this.utilsService.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        })

      }).catch(error => {  // Maneja errores al obtener el documento
        console.log(error);

        this.utilsService.presentToast({  // Muestra un mensaje de error
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();  // Cierra el indicador de carga
      })
    }
  }
}
