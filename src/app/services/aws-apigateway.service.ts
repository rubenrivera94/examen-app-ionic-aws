import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AwsApigatewayService {

  urlAddCliente: string = "https://d6k0xznb0f.execute-api.us-east-2.amazonaws.com/produccion/clientes/add-cliente"

  urlGetCliente: string = "https://d6k0xznb0f.execute-api.us-east-2.amazonaws.com/produccion/clientes/get-cliente"


  constructor(private httpClient: HttpClient) { }

  getCliente(): Observable <any> {
    return this.httpClient.get(this.urlGetCliente)
  }

  // Método para enviar y crear datos de un cliente 
  postCliente(nombre: string, email: string): Observable<any> {
    const clienteData = {
      nombre: nombre.trim(),  // Asegúrate de eliminar espacios innecesarios
      email: email.trim()
    };

    return this.httpClient.post(this.urlAddCliente, clienteData);
  }

  // Método para enviar datos de un producto
  postProducto(nombre_producto: string, precio_producto: number, stock_producto: number) {
    const body = { nombre_producto: nombre_producto, precio_producto: precio_producto, stock_producto: stock_producto };
    return this.httpClient.post(this.urlAddCliente, body);
  }

  // Método para enviar datos de un envío
  postEnvio(id_cliente: string, id_producto: string, fecha_envio: string, direccion_envio: string, estado_envio: string) {
    const body = {
      id_cliente: id_cliente,              // ID del cliente asociado al envío
      id_producto: id_producto,            // ID del producto asociado al envío
      fecha_envio: fecha_envio,            // Fecha en que se realiza el envío
      direccion_envio: direccion_envio,    // Dirección de destino del envío
      estado_envio: estado_envio           // Estado actual del envío (ej. pendiente, enviado)
    };
    return this.httpClient.post(this.urlAddCliente, body);
  }
}
