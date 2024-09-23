import { AwsApigatewayService } from 'src/app/services/aws-apigateway.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.page.html',
  styleUrls: ['./aws.page.scss'],
})
export class AwsPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private awsService: AwsApigatewayService,
  ) {}
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),  // Campo de correo electrónico con validación requerida y formato de email
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),  // Campo de nombre requerido con longitud mínima de 4 caracteres
  })
  // Inyecta los servicios de Firebase y Utils para interactuar con Firebase y manejar utilidades como notificaciones y redirecciones.
  utilsService = inject(UtilsService);

  ngOnInit() { }
  
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();

      console.log(this.form.value);  // Imprime el objeto del formulario para ver qué se está enviando

      this.awsService.postCliente(this.form.value.nombre, this.form.value.email)
        .subscribe({
          next: async (res) => {
            console.log('Cliente creado:', res);
            this.utilsService.presentToast({
              message: 'Cliente creado exitosamente',
              duration: 2500,
              color: 'primary',
              position: 'middle',
              icon: 'checkmark-circle-outline'
            });
            this.form.reset();
          },
          error: (error) => {
            console.error('Error:', error);
            this.utilsService.presentToast({
              message: error.message || 'Error al crear el cliente',
              duration: 2500,
              color: 'danger',
              position: 'middle',
              icon: 'alert-circle-outline'
            });
          },
          complete: () => {
            loading.dismiss();
          }
        });
    } else {
      console.log('Formulario no válido', this.form.errors);  // Verifica los errores del formulario
    }
  }
}
