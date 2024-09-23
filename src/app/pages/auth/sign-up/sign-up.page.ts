import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  // Define un formulario Reactivo con los campos uid, email, password y name, junto con validaciones.
  form = new FormGroup({
    uid: new FormControl(''),  // UID del usuario, inicialmente vacío
    email: new FormControl('', [Validators.required, Validators.email]),  // Campo de correo electrónico con validación requerida y formato de email
    password: new FormControl('', [Validators.required]),  // Campo de contraseña requerido
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),  // Campo de nombre requerido con longitud mínima de 4 caracteres
  })

  // Inyecta los servicios de Firebase y Utils para interactuar con Firebase y manejar utilidades como notificaciones y redirecciones.
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  ngOnInit() {
    // Este método se ejecuta al inicializar el componente, actualmente no tiene lógica.
  }

  // Método que se ejecuta cuando el formulario de registro se envía.
  async submit() {
    // Comprueba si el formulario es válido antes de proceder.
    if (this.form.valid) {
      // Muestra un indicador de carga mientras se procesa la solicitud.
      const loading = await this.utilsService.loading();
      await loading.present();

      // Llama al servicio de Firebase para registrar al usuario con los valores del formulario.
      this.firebaseService.signUp(this.form.value as User).then(async res => {
        // Si el registro es exitoso, actualiza el nombre del usuario en Firebase.
        await this.firebaseService.updateUser(this.form.value.name);

        // Obtiene el UID del usuario registrado y lo establece en el formulario.
        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        // Llama al método para guardar la información del usuario en la base de datos.
        this.setUserInfo(uid);

      }).catch(error => {
        // Si ocurre un error, muestra un mensaje de error mediante un toast.
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        // Cierra el indicador de carga independientemente de si la operación fue exitosa o no.
        loading.dismiss();
      })
    }
  }

  // Método para guardar la información del usuario en la base de datos de Firebase.
  async setUserInfo(uid: string) {
    // Comprueba si el formulario sigue siendo válido.
    if (this.form.valid) {
      // Muestra un indicador de carga mientras se guarda la información.
      const loading = await this.utilsService.loading();
      await loading.present();

      // Define la ruta en la base de datos donde se guardará la información del usuario.
      let path = `users/${uid}`;
      delete this.form.value.password;  // Elimina el campo de contraseña antes de guardar la información del usuario.

      // Guarda la información del usuario en la base de datos de Firebase.
      this.firebaseService.setDocument(path, this.form.value).then(async res => {
        // Guarda la información del usuario en el LocalStorage y redirige a la página principal.
        this.utilsService.saveInLocalStorage('user', this.form.value);
        this.utilsService.routerLink('/main/scan');
        this.form.reset();  // Resetea el formulario después de guardar la información.

      }).catch(error => {
        // Si ocurre un error, muestra un mensaje de error mediante un toast.
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        // Cierra el indicador de carga después de la operación.
        loading.dismiss();
      })
    }
  }
}
